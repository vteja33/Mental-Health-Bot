import os
import openai
from textblob import TextBlob
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


def analyze_sentiment(user_input):

    blob = TextBlob(user_input)
    sentiment = blob.sentiment.polarity

    if sentiment > 0.5:
        sentiment = "positive"
    elif sentiment < -0.5:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return sentiment

@app.route('/chat', methods=['POST'])

def chat():

    data = request.get_json()  
    user_input = data.get('message')

    if not user_input:
        return jsonify({"error: No message provided"}), 400
    
    sentiment = analyze_sentiment(user_input)

    messages = [
        {
            "role": "system",
            "content": "You are a helpful and friendly mental health assistant."
        },
        {
            "role": "user",
            "content": user_input
        },
        {
            "role": "system",
            "content": (
                f"The user's sentiment is {sentiment}. Respond according to the sentiment. "
                "If the user's sentiment is negative, offer helpful practices or resources to improve their mood. "
                "If a crisis is detected, provide a crisis hotline and encourage them to seek help."
            )
        }
    ]
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150,
            temperature=0.7
        )
        ai_response = response.choices[0].message.content
        return jsonify({"message": ai_response}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
