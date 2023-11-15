from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import logging
from model.argq import ArgqClassifier

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.info("Starting application")
logging.info("Loading model..")
model = ArgqClassifier()
logging.info("Model loaded")

class Tweet(BaseModel):
    text: str

@app.post("/argq/classify")
async def get_text_classification(tweet: Tweet):
    classification = await model.classify_text(tweet.text)
    return {
        "classification": classification
    }