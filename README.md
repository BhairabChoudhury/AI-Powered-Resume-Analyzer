AI Resume Analyzer

AI-powered ATS Resume Analyzer

Simulate how real Applicant Tracking Systems (ATS) scan, filter, and score your resume. Get actionable feedback, keyword gaps, and role-based insights to improve your chances before you apply. 

🚀 Features

    - PDF Resume Upload: Upload your resume in PDF format.
    - Role & JD Matching: Select a target role or paste a job description for best accuracy.
    - AI Analysis: Extracts skills, soft skills, certifications, and matches them to the role/JD using advanced NLP.
    - ATS Score: See your overall ATS score and detailed breakdown (skills, experience, education).
    - Skill Tags: Instantly see matched, missing, and extra skills.
    - Strengths & Weaknesses: Get personalized strengths, weaknesses, and improvement suggestions.
    - Role-Specific Insights: View key responsibilities and keywords for your target role.
    - Downloadable PDF Report: Download a detailed, human-readable report.
    - Modern UI: Built with React, Tailwind CSS, and Recharts for a clean, interactive experience.


📸 Screenshots

![alt text](Screenshot%202026-02-25%20222405.png)  


![alt text](Screenshot%202026-02-25%20234214.png)


![alt text](Screenshot%202026-02-25%20223014.png)

## 🛠️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Python](https://www.python.org/) (v3.10+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Optional, for Docker setup)

---

### 🚀 Docker Setup (Recommended)
The easiest way to run the entire stack is using Docker Compose.

1. **Start Docker Desktop**.
2. Run the following command in the root directory:
   ```bash
   docker-compose up --build
   ```
3. Access the app:
   - **Frontend**: `http://localhost:3000`
   - **Node Backend**: `http://localhost:8000`
   - **AI Backend**: `http://localhost:8001`

---

### 💻 Local Setup (Development)

#### 1. AI Backend (Python)
```bash
cd Backend/Ai
python -m venv venv
source venv/Scripts/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### 2. Node Backend (Express)
Create a `.env` file in `Backend/node/` with `PORT`, `MONGO_URL`, and `JWT_SECRET`.
```bash
cd Backend/node
npm install
npm start
```

#### 3. Frontend (React + Vite)
```bash
cd Frontend
npm install
npm run dev
```

---

## 🛠️ Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide React
- **Backend**: Node.js, Express, MongoDB (Atlas)
- **AI Engine**: Python, FastAPI, Google Gemini API, sentence-transformers , NLP 
- **DevOps**: Docker, Docker Compose
