from flask import Blueprint, request, jsonify
from ..models.database import get_db, save_encoding
from ..utils.dna_encoder import encode_with_model

api = Blueprint('api', __name__)

@api.route('/encode', methods=['POST'])
def encode_text():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(k in data for k in ['name', 'email', 'text']):
            return jsonify({
                'error': 'Missing required fields. Please provide name, email, and text.'
            }), 400
        
        name = data['name']
        email = data['email']
        text = data['text']
        
        # Encode text to DNA
        dna_sequence, used_ml = encode_with_model(text)
        
        # Save to database
        db = next(get_db())
        encoding = save_encoding(db, name, email, text, dna_sequence)
        
        return jsonify({
            'success': True,
            'dna_sequence': dna_sequence,
            'used_ml': used_ml,
            'encoding_id': encoding.id
        })
        
    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}'
        }), 500 