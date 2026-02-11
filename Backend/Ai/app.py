

import uvicorn
from fastapi import FastAPI 
from pydantic import BaseModel 

from services.analyzer import analyze_resume 
from services.ai_explainer import generate_ai_feedback 
 
app = FastAPI() ;  

class AnalyzeRequest(BaseModel) :
    resume_text : str 
    jd_text : str 
    role : str | None = None  


@app.post("/analyze") 
def analyze(req : AnalyzeRequest) : 
    # NLP layer 
    nlp_result = analyze_resume(
        resume_text = req.resume_text,
        jd_text = req.jd_text,
        selected_role = req.role
    )

    # AI explanation layer 
    ai_feedback = generate_ai_feedback(nlp_result, req.resume_text, req.jd_text)

    return {
        **nlp_result,
        **ai_feedback
    }



if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8001, reload=True)
