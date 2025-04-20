from flask import Blueprint, request, jsonify
from app import db
from models import DNAEncoding, DNADecoding
from utils import encode_to_dna, decode_from_dna, format_output
from datetime import datetime

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is running!"})

@main_bp.route('/api/encode', methods=['POST'])
def encode_dna():
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({"status": "error", "message": "No text provided"}), 400
            
        # Encode text to DNA
        dna_sequence = encode_to_dna(text)
        
        # Save to database
        encoding = DNAEncoding(
            input_text=text,
            encoded_sequence=dna_sequence,
            created_at=datetime.utcnow()
        )
        db.session.add(encoding)
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "dna_sequence": dna_sequence,
            "id": encoding.id
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@main_bp.route('/api/decode', methods=['POST'])
def decode_dna():
    try:
        data = request.get_json()
        dna_sequence = data.get('dna_sequence')
        output_format = data.get('output_format', 'text')
        
        if not dna_sequence:
            return jsonify({"status": "error", "message": "No DNA sequence provided"}), 400
            
        # Decode DNA to text
        decoded_text = decode_from_dna(dna_sequence)
        
        # Save to database
        decoding = DNADecoding(
            input_sequence=dna_sequence,
            decoded_text=decoded_text,
            created_at=datetime.utcnow()
        )
        db.session.add(decoding)
        db.session.commit()
        
        # Format output according to requested format
        formatted_output = format_output(decoded_text, output_format)
        
        return jsonify({
            "status": "success",
            "output": formatted_output,
            "format": output_format,
            "id": decoding.id
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@main_bp.route('/api/history', methods=['GET'])
def get_history():
    try:
        # Get encoding history
        encodings = DNAEncoding.query.order_by(DNAEncoding.created_at.desc()).limit(10).all()
        encodings_data = [{
            'id': e.id,
            'input_text': e.input_text,
            'encoded_sequence': e.encoded_sequence,
            'created_at': e.created_at.isoformat()
        } for e in encodings]
        
        # Get decoding history
        decodings = DNADecoding.query.order_by(DNADecoding.created_at.desc()).limit(10).all()
        decodings_data = [{
            'id': d.id,
            'input_sequence': d.input_sequence,
            'decoded_text': d.decoded_text,
            'created_at': d.created_at.isoformat()
        } for d in decodings]
        
        return jsonify({
            "status": "success",
            "encodings": encodings_data,
            "decodings": decodings_data
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500 