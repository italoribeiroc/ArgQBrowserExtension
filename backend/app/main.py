from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import logging
from model.argq import ArgqClassifier
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
import uvicorn
from os import getenv, path


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI(title="ArgQ Backend", version="0.0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.info("Starting application")
cred_file_path = path.join(path.dirname(__file__), "../credentials/firebase-adminsdk.json")
cred = credentials.Certificate(cred_file_path)
firebase_admin.initialize_app(cred)

db = firestore.client()

logging.info("Loading model..")
model = ArgqClassifier()
logging.info("Model loaded")

class Tweet(BaseModel):
    text: str

class TextWithAspects(BaseModel):
    tweet: Tweet
    aspects: list = ["quality", "clarity", "organization", "credibility", "emotional_polarity", "emotional_intensity"]

class FeedbackItem(BaseModel):
    email: str
    text: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

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

@app.post("/argq/feedback")
async def post_feedback(item: FeedbackItem):
    feedback_data = item.model_dump()
    now = datetime.now()
    doc_name = now.strftime("%Y%m%d_%H%M%S")
    doc_ref = db.collection('feedback').document(doc_name)
    doc_ref.set(feedback_data)
    return {"status": "success", "feedback_received": feedback_data}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(getenv("PORT", 8000)), reload=True)