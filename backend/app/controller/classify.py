from model.argq import ArgqClassifier, get_model
from fastapi import Depends

class ClassifyController:
    async def get_text_classification(self, text: str, model=Depends(get_model)):
        print(dir(model))
        return 0