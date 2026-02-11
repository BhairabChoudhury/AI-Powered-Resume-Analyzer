import requests
import json
import time

url = 'http://127.0.0.1:8001/analyze'

# Wait a bit for server to start
# Server already running

payload = {
    "resume_text": " i am a student and i have no experience",
    "jd_text": "Seeking a Python developer with experience in web frameworks and AI  , deployment , flask , Nodejs , expressjs , .",
    "role": "Backend Developer"
}

headers = {'Content-Type': 'application/json'}

try:
    print(f"Sending POST request to {url}...")
    response = requests.post(url, headers=headers, json=payload)
    
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Response JSON:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"Error: {response.text}")

except Exception as e:
    print(f"Request failed: {e}")
