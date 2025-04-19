from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Basic route for testing
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is running!"})

# DNA encoding route
@app.route('/api/encode', methods=['POST'])
def encode_dna():
    try:
        data = request.get_json()
        # TODO: Implement DNA encoding logic
        return jsonify({"status": "success", "message": "DNA encoding successful"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# DNA decoding route
@app.route('/api/decode', methods=['POST'])
def decode_dna():
    try:
        data = request.get_json()
        # TODO: Implement DNA decoding logic
        return jsonify({"status": "success", "message": "DNA decoding successful"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 