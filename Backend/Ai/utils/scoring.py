from sklearn.metrics.pairwise import cosine_similarity 
from models.embeddings import embedding_model 


def semantic_similarity(text1 , text2) :
    embedding = embedding_model.encode([text1, text2]) ; 

    score = cosine_similarity([embedding[0]],[embedding[1]])[0][0]

    score = max(score, 0)  # -0.12 can produce , then take 0 as lowest

    return round(float(score)*100, 2) 


def calculate_skills_score(matched_skills , total_jd_skills) :
    if total_jd_skills == 0 :
        return 0.0 ; 

    score = (len(matched_skills) / total_jd_skills) * 100 ; 

    return round(score , 2) 