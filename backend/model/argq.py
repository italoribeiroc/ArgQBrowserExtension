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
        self.models = {
            'quality': pickle.load(open('model_cpu.sav', 'rb')),
            'clarity': pickle.load(open('model_cla_cpu.sav', 'rb')),
            'organization': pickle.load(open('model_org_cpu.sav', 'rb')),
            'credibility': pickle.load(open('model_cre_cpu.sav', 'rb')),
            'emotional_polarity': pickle.load(open('model_aemp_cpu.sav', 'rb')),
            'emotional_intensity': pickle.load(open('model_aemi_cpu.sav', 'rb'))
        }
        self.max_length = 180

    async def classify_text(self, text):
        inputs = self.tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=self.max_length).to(self.device)
        model = self.models["quality"]
        output = model(**inputs)

        pred_labels = torch.argmax(output.logits, 1)
        y_pred = pred_labels[0]
        return y_pred.item()
    
    async def classify_text_by_aspect(self, text, aspect):
        inputs = self.tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=self.max_length).to(self.device)
        model = self.models[aspect]
        output = model(**inputs)

        pred_labels = torch.argmax(output.logits, 1)
        y_pred = pred_labels[0]
        return y_pred.item()