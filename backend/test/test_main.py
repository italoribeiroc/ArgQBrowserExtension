from fastapi.testclient import TestClient
from app.main import app
from datetime import datetime
from zoneinfo import ZoneInfo

client = TestClient(app)

TEST_TEXTS = [
    "mano eu não entendo a cabeça da esquerda, vcs são doentes, projetos que vão ajudar a economia do Brasil, até mesmo pra ajudar pagar dividas que o próprio auxilio emergencial vai criar... vcs são doentes???",
    "O mais difícil de entender é que especialistas dizem que a aprovação não era benéfica e ainda assim eles aprovam! Oq esses deputados entendem dessa questão? Tipo assim, não votem a favor pq é ruim para o povo, aí ligam o fodasse e fazem assim mesmo, que porra é essa?",
    "Você votou? Provavelmente votou NÃO. Então a pergunta é: você está “tistinho” porque perdeu? Se a autonomia não fosse aprovada você estaria aqui se manifestando contra? Ou estaria exaltando os deputados que entenderam que o BC precisa ter um freio? Totalmente sem noção!",
    "Rodrigo Maia, você hoje já falou que se arrepende do apoio a Bolsonaro no segundo turno. Parabéns por admitir isto. Agora... quando virá o arrependimento de não ter ao menos colocado para a frente algum dos pedidos de Impeachment?",
    "Vc propôs essa emenda, esperando que passe ou apenas para constar? Com a postagem do seu presidente da câmara, que até já considerou que o Dep. Daniel Silveira contrapôs à democracia, mesmo não tendo sido julgado e condenado pelo STF, espera que essa sua proposta tenha sucesso? https://t.co/uJjvgcwqEt",
    "Desculpe senhora deputada, cansei de vcs ! Ninguém faz nada, ninguém! Vcs brincam com o povo! Se hoje um governador maluco fizer um forno, como foi feito na Alemanha e começar a matar as pessoas,tudo bem , os caras que jamais devem ser citados, deram o direito !",
    "Caro Deputado, não sei se irá ler meu posicionamento. Mas, calaram a voz de uma Deputado q foi eleito para PODER FALAR POR NÓS! Um PODER, calou a não a voz do Daniel, calou foi a NOSSA! Ontem foi deputado pondo mordaça da boca de outro deputado e traçando o fim do CONGRESSO.",
    "Está na hora de exigir o respeito com seriedade, impeachment se faz mais que necessário, ele está tentando rebaixar a Câmara dos Deputados a seu serviço, uma ação judicial enérgica imediata. Ação do Arthur Lira agora, se deixar passar perderá a força",
]

TEST_TEXTS_EXPECTED_RESULTS = [0, 1, 0, 2, 2, 2, 2, 2]

TEST_TEXTS_EXPECTED_RESULTS_FOR_CLARITY = [2, 1, 2, 1, 2, 2, 2, 2]

class TestMain:
    def test_get_text_classification(self):
        for i, text in enumerate(TEST_TEXTS):
            tweet = {"text": text}
            response = client.post("/argq/classify", json=tweet)
            assert response.status_code == 200
            assert response.json() == {"classification": TEST_TEXTS_EXPECTED_RESULTS[i]}

    def test_get_text_clarity_classification(self):
        for i, text in enumerate(TEST_TEXTS):
            request = {
                "tweet":{
                    "text": text
                },
                "aspects": [
                    "clarity"
                ]
            }
            output = {"classification": {"clarity": TEST_TEXTS_EXPECTED_RESULTS_FOR_CLARITY[i]}}
            response = client.post("/argq/classify/aspects", json=request)
            assert response.status_code == 200
            assert response.json() == output

    def test_get_text_all_aspects_classification(self):
        text = TEST_TEXTS[0]
        request = {
            "tweet":{
                "text": text
            }
        }
        output = {
            "classification": {
                "quality": 0,
                "clarity": 2,
                "organization": 1,
                "credibility": 0,
                "emotional_polarity": 0,
                "emotional_intensity": 1
            }
        }
        response = client.post("/argq/classify/aspects", json=request)
        assert response.status_code == 200
        assert response.json() == output

    def test_post_feedback(self, mocker):
        test_data = {
            "email": "test@example.com",
            "text": "This is a test feedback.",
            "timestamp": datetime.utcnow().isoformat()
        }

        mocked_collection = mocker.patch('google.cloud.firestore.Client.collection')
        mocked_collection.return_value.document.return_value.set.return_value = None

        response = client.post("/argq/feedback", json=test_data)

        mocked_collection.assert_called_once()

        assert response.status_code == 200
        assert response.json() == {"status": "success", "feedback_received": test_data}