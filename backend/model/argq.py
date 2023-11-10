import pickle
import torch
from transformers import AutoTokenizer

class ArgqClassifier:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained('neuralmind/bert-base-portuguese-cased', do_lower_case=False)
        self.model = pickle.load(open('model.sav', 'rb'))
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.max_length = 180

    async def classify_text(self, text):
        inputs = self.tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=self.max_length).to(self.device)
        output = self.model(**inputs)

        pred_labels = torch.argmax(output.logits, 1)
        y_pred = pred_labels[0]
        return y_pred.item()
    
    async def hello(self):
        return "foi"

# val_X = [
#     "mano eu não entendo a cabeça da esquerda, vcs são doentes, projetos que vão ajudar a economia do Brasil, até mesmo pra ajudar pagar dividas que o próprio auxilio emergencial vai criar... vcs são doentes???",
#     "O mais difícil de entender é que especialistas dizem que a aprovação não era benéfica e ainda assim eles aprovam! Oq esses deputados entendem dessa questão? Tipo assim, não votem a favor pq é ruim para o povo, aí ligam o fodasse e fazem assim mesmo, que porra é essa?",
#     "Você votou? Provavelmente votou NÃO. Então a pergunta é: você está “tistinho” porque perdeu? Se a autonomia não fosse aprovada você estaria aqui se manifestando contra? Ou estaria exaltando os deputados que entenderam que o BC precisa ter um freio? Totalmente sem noção!",
#     "Rodrigo Maia, você hoje já falou que se arrepende do apoio a Bolsonaro no segundo turno. Parabéns por admitir isto. Agora... quando virá o arrependimento de não ter ao menos colocado para a frente algum dos pedidos de Impeachment?",
#     "Vc propôs essa emenda, esperando que passe ou apenas para constar? Com a postagem do seu presidente da câmara, que até já considerou que o Dep. Daniel Silveira contrapôs à democracia, mesmo não tendo sido julgado e condenado pelo STF, espera que essa sua proposta tenha sucesso? https://t.co/uJjvgcwqEt",
#     "Desculpe senhora deputada, cansei de vcs ! Ninguém faz nada, ninguém! Vcs brincam com o povo! Se hoje um governador maluco fizer um forno, como foi feito na Alemanha e começar a matar as pessoas,tudo bem , os caras que jamais devem ser citados, deram o direito !",
#     "Caro Deputado, não sei se irá ler meu posicionamento. Mas, calaram a voz de uma Deputado q foi eleito para PODER FALAR POR NÓS! Um PODER, calou a não a voz do Daniel, calou foi a NOSSA! Ontem foi deputado pondo mordaça da boca de outro deputado e traçando o fim do CONGRESSO.",
#     "Está na hora de exigir o respeito com seriedade, impeachment se faz mais que necessário, ele está tentando rebaixar a Câmara dos Deputados a seu serviço, uma ação judicial enérgica imediata. Ação do Arthur Lira agora, se deixar passar perderá a força",
# ]

# for x in val_X:
#     inputs = tokenizer(x, return_tensors='pt', padding=True, truncation=True, max_length=max_length).to(device)
#     output = model(**inputs)

#     pred_labels = torch.argmax(output.logits, 1)

#     y_pred = pred_labels[0]

#     #print(x)
#     print(y_pred, labels[y_pred.item()])