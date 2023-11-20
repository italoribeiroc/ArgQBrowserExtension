import pickle
import torch
from transformers import AutoTokenizer
import logging

class ArgqClassifier:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained('neuralmind/bert-base-portuguese-cased', do_lower_case=False)
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.device = torch.device(device)
        logging.info(f"Version: {torch.__version__}")
        logging.info(f"Device being used: {device}")
        self.model = pickle.load(open('model_cpu.sav', 'rb'))
        self.max_length = 180

    async def classify_text(self, text):
        inputs = self.tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=self.max_length).to(self.device)
        output = self.model(**inputs)

        pred_labels = torch.argmax(output.logits, 1)
        y_pred = pred_labels[0]
        return y_pred.item()