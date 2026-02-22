# AI Backend (FastAPI)

This is the Python-based AI service for analyzing resumes against job descriptions.

## Prerequisites

- Python 3.10+
- Dependencies installed: `pip install -r requirements.txt`

## How to Run

1.  **Activate the Virtual Environment**:
    ```bash
    .\venv\Scripts\activate
    ```

2.  **Start the Server**:
    ```bash
    uvicorn app:app --reload --port 8001
    ```
    OR (if `uvicorn` is not in PATH):
    ```bash
    python -m uvicorn app:app --reload --port 8001
    ```
    or 
    source venv/Scripts/activate && python app.py

The API will be running at `http://127.0.0.1:8001`.   

## API Endpoints
    run test_backend.py to test the API 
     ```bash
    python test_backend.py.
    ```
-   `POST /analyze`:
    -   Payload: `{ "resume_text": "...", "jd_text": "...", "role": "..." }`
    -   Returns: Analysis result (overall score, breakdown, matched skills, etc.)
