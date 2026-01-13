import joblib
import pandas as pd
import os

MODEL_PATH = "cardio_model.pkl"

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("❌ cardio_model.pkl not found")

artifact = joblib.load(MODEL_PATH)

model = artifact["model"]
threshold = artifact["threshold"]
features = artifact["features"]
feature_importance = artifact["feature_importance"]

def predict(data):
    bmi = data.weight / ((data.height / 100) ** 2)

    input_df = pd.DataFrame([{
        "age_in_years": data.age,
        "gender": data.gender,
        "bmi": bmi,
        "ap_hi": data.ap_hi,
        "ap_lo": data.ap_lo,
        "cholesterol": data.cholesterol,
        "gluc": data.gluc,
        "smoke": data.smoke,
        "alco": data.alco,
        "active": data.active
    }])

    probability = model.predict_proba(input_df)[0][1]
    risk_label = "High Risk" if probability >= threshold else "Low Risk"

    return {
        "probability": round(float(probability), 4),
        "risk_label": risk_label
    }

def get_feature_importance():
    return dict(zip(features, feature_importance))
