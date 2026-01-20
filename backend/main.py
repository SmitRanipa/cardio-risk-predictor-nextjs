from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import PatientInput, PredictionResponse
from model import predict, get_feature_importance

app = FastAPI(
    title="Cardio AI Backend",
    description="ML-powered cardiovascular risk prediction API",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://cardio-risk-predictor-nextjs.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {"status": "Cardio API is running"}

@app.get("/healthz")
def healthz():
    return {"status": "healthy"}

@app.post("/predict", response_model=PredictionResponse)
def predict_api(data: PatientInput):
    try:
        return predict(data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/insights")
def insights():
    return {"feature_importance": get_feature_importance()}
