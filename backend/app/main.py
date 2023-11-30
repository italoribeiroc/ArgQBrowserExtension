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

class TextWithAspects(BaseModel):
    tweet: Tweet
    aspects: list = ["quality", "clarity", "organization", "credibility", "emotional_polarity", "emotional_intensity"]

@app.post("/argq/classify")
async def get_text_classification(tweet: Tweet):
    classification = await model.classify_text(tweet.text)
    return {
        "classification": classification
    }

@app.post("/argq/classify/aspects")
async def get_text_classification_by_aspects(request: TextWithAspects):
    classification = {
        aspect: await model.classify_text_by_aspect(request.tweet.text, aspect) for aspect in request.aspects
    }
    return {
        "classification": classification
    }