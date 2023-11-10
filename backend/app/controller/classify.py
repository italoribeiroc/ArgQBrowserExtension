from model.argq import ArgqClassifier

class ClassifyController:
    def __init__(self) -> None:
        self.classifier = ArgqClassifier()

    async def get_text_classification(self, text: str):
        return self.classifier.hello()