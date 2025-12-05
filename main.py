from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)  # allow requests from Chrome extension
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB limit


def analyze_with_ollama(policy_text: str):
    """
    Yaha originally Ollama LLM call hota tha.
    Abhi hum demo / project ke liye simple dummy analysis return kar rahe hain.
    Chahe jo bhi policy_text ho, yeh structured JSON dega.
    """

    # Thoda sa pseudo-logic (keywords dekh ke rating change kar sakte ho)
    text_lower = policy_text.lower()

    def has(words):
        return any(w in text_lower for w in words)

    # Base rating
    data_collection = 3
    data_usage = 3
    data_sharing = 3
    data_selling = 2
    opt_out = 2
    security = 3
    deletion = 3
    clarity = 3

    # Very simple rules – chahe badal lena:
    if has(["share", "third party", "partners"]):
        data_sharing = 2
    if has(["sell", "sold", "sale of data"]):
        data_selling = 1
    if has(["encrypt", "encryption", "secure"]):
        security = 4
    if has(["delete", "erasure", "remove"]):
        deletion = 4
    if has(["consent", "opt-out", "unsubscribe"]):
        opt_out = 4
    if has(["clear", "simple", "plain language"]):
        clarity = 4

    # Final rating ka simple average
    all_ratings = [
        data_collection,
        data_usage,
        data_sharing,
        data_selling,
        opt_out,
        security,
        deletion,
        clarity,
    ]
    final_rating = round(sum(all_ratings) / len(all_ratings), 1)

    return {
        "ratings": [
            {
                "parameter": "Data Collection",
                "rating": data_collection,
                "explanation": "How much aur kis type ka data collect hota hai.",
            },
            {
                "parameter": "Data Usage",
                "rating": data_usage,
                "explanation": "Collected data ko kis purpose ke liye use karte hain.",
            },
            {
                "parameter": "Data Sharing with Third Parties",
                "rating": data_sharing,
                "explanation": "Kya data third-party companies ke saath share hota hai.",
            },
            {
                "parameter": "Data Selling to Third Parties",
                "rating": data_selling,
                "explanation": "Kya company aapka data bech sakti hai.",
            },
            {
                "parameter": "Opt-Out Options for Data Sharing",
                "rating": opt_out,
                "explanation": "Kya user ke paas opt-out / unsubscribe options available hain.",
            },
            {
                "parameter": "Data Security",
                "rating": security,
                "explanation": "Security measures jaise encryption, access control, etc.",
            },
            {
                "parameter": "Data Deletion",
                "rating": deletion,
                "explanation": "User apna data delete ya account remove kar sakta hai ya nahi.",
            },
            {
                "parameter": "Policy Clarity",
                "rating": clarity,
                "explanation": "Policy simple, clear language me likhi hai ya nahi.",
            },
        ],
        "final_rating": {
            "rating": final_rating,
            "explanation": "Overall privacy safety ka average score.",
        },
    }


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json() or {}
    policy_text = data.get("policy_text", "")

    if not policy_text:
        return jsonify({"error": "No policy text provided"}), 400

    result = analyze_with_ollama(policy_text)
    logging.info(f"Backend response: {result}")
    return jsonify(result)


if __name__ == "__main__":
    # IMPORTANT: port 8000 (popup.js me bhi yehi hai)
    app.run(port=8000, debug=True)
