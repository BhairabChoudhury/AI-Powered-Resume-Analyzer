import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure the Gemini API
API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

def generate_ai_feedback(nlp_result: dict, resume_text: str, jd_text: str) -> dict:
    """
    Generates Strengths, Weaknesses, and Recommendations using Google Gemini Model.
    """
    if not API_KEY:
        print("Warning: GOOGLE_API_KEY not found. AI feedback will be empty.")
        return {
            "strengths": [],
            "weaknesses": [],
            "recommendations": []
        }

    try:
        model = genai.GenerativeModel('gemini-flash-latest')

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) and Career Coach.
        Analyze the following Resume against the Job Description (JD).
        
        Using the provided NLP Analysis Result as context, provide specific feedback.
        
        Resume Content:
        {resume_text[:2000]}... (truncated)

        Job Description:
        {jd_text[:2000]}... (truncated)
        
        NLP Analysis Context:
        - Role: {nlp_result.get('role')}
        - Missing Skills: {nlp_result.get('missing_skills')}
        - Matched Skills: {nlp_result.get('matched_skills')}
        
        STRICT OUTPUT FORMAT:
        Return ONLY valid JSON with no markdown formatting or constraints. 
        The JSON must match this structure:
        {{
            "strengths": ["list of 3-5 strong points"],
            "weaknesses": ["list of 3-5 weak points or missing critical skills"],
            "recommendations": ["list of 5-6 actionable steps to improve"]
        }}
        """

        response = model.generate_content(prompt)
        
        # Clean up code blocks if present (Gemini sometimes returns ```json ... ```)
        text_response = response.text.strip()
        if text_response.startswith("```"):
            text_response = text_response.replace("```json", "").replace("```", "").strip()
            
        return json.loads(text_response)

    except Exception as e:
        print(f"Error generating AI feedback: {e}")
        return {
            "strengths": ["Could not generate feedback at this time."],
            "weaknesses": [],
            "recommendations": []
        }


