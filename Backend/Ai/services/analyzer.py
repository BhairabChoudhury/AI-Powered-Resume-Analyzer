import re
from utils.Skills import (
    extract_skills,
    infer_role,
    extract_soft_skills,
    extract_certifications,
    ROLE_SKILLS
)
from utils.scoring import semantic_similarity, calculate_skills_score


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    return text.strip().lower()


def has_degree(text: str) -> bool:
    degrees = ["bachelor", "b.tech", "b.e", "bsc", "master", "m.tech", "msc", "mba", "phd"]
    return any(d in text for d in degrees)


def analyze_resume(resume_text: str, jd_text: str, selected_role: str | None = None):
    resume_text = clean_text(resume_text)
    jd_text = clean_text(jd_text)

    # ---- Role ----
    role = selected_role if selected_role else infer_role(jd_text)
    role_skills = set(ROLE_SKILLS.get(role, []))

    # ---- Skill Extraction ----
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text) if jd_text else list(role_skills)

    matched_skills = list(set(resume_skills) & set(jd_skills))
    missing_skills = list(set(jd_skills) - set(resume_skills))

    matched_role_skills = list(set(resume_skills) & role_skills)
    techstack_coverage = (
        round((len(matched_role_skills) / len(role_skills)) * 100, 2)
        if role_skills else 0.0
    )

    # ---- Section Detection ----
    # Detect "experience" but ignore "no experience", "not have experience"
    # Using negative lookbehind (?<!no\s) is limited in Python re to fixed length, so we use a more robust regex or just check for negation nearby.
    # Simple approach: Check if "experience" exists AND it's not part of "no experience".
    # But "experience" might appear multiple times.
    # Better: finding all "experience" matches and checking if ANY is valid (not preceded by "no ").
    
    experience_matches = re.finditer(r"(?<!no\s)experience|work|intern", resume_text)
    has_experience = any(True for _ in experience_matches)
    
    # "project" is usually safe, but let's be careful.
    has_projects = "project" in resume_text
    
    # "education" might be in "no education".
    education_keywords = ["education", "university", "college", "school"]
    matched_edu = re.search(r"(?<!no\s)(" + "|".join(education_keywords) + r")", resume_text)
    has_education = bool(matched_edu) or has_degree(resume_text)

    # ---- Scoring ----
    skills_score = calculate_skills_score(matched_skills, len(jd_skills))

    experience_score = min(
        100.0,
        20.0 + (40 if has_experience else 0) + (20 if has_projects else 0)
    )

    education_score = 80.0 if has_education else 20.0
    semantic_score = semantic_similarity(resume_text, jd_text) if jd_text else 0.0

    overall_score = round(
        (skills_score * 0.4) +
        (experience_score * 0.3) +
        (education_score * 0.2) +
        (semantic_score * 0.1),
        2
    )

    return {
        "role": role,
        "overall_score": overall_score,
        "score_breakdown": {
            "skills_match": round(skills_score, 2),
            "experience_match": round(experience_score, 2),
            "education_match": round(education_score, 2)
        },
        "techstack_coverage": techstack_coverage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }
