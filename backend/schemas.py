from pydantic import BaseModel, Field

class PatientInput(BaseModel):
    age: int = Field(..., ge=18, le=100)
    gender: int
    height: float = Field(..., ge=120, le=220)
    weight: float = Field(..., ge=30, le=200)
    ap_hi: int = Field(..., ge=70, le=250)
    ap_lo: int = Field(..., ge=40, le=150)
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int

class PredictionResponse(BaseModel):
    probability: float
    risk_label: str
