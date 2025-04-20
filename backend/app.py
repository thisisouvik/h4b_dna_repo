from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from models import DNAEncoding, DNADecoding, SessionLocal
from utils import encode_text, decode_sequence, calculate_gc_content, calculate_stability_score
import tempfile
import os

app = Flask(__name__, static_folder='../frontend/build')
CORS(app)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.route('/api/encode', methods=['POST'])
def encode():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text']
        options = data.get('options', {})
        
        # Encode the text
        dna_sequence = encode_text(text, options)
        
        # Calculate metrics
        gc_content = calculate_gc_content(dna_sequence)
        stability = calculate_stability_score(dna_sequence)
        
        # Save to database
        db = next(get_db())
        encoding = DNAEncoding(
            input_text=text,
            encoded_sequence=dna_sequence
        )
        db.add(encoding)
        db.commit()
        
        return jsonify({
            'sequence': dna_sequence,
            'metrics': {
                'gc_content': gc_content,
                'stability': stability,
                'length': len(dna_sequence)
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/encode/file', methods=['POST'])
def encode_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Read and encode the file content
        text = file.read().decode('utf-8')
        dna_sequence = encode_text(text)
        
        # Save to database
        db = next(get_db())
        encoding = DNAEncoding(
            input_text=text,
            encoded_sequence=dna_sequence
        )
        db.add(encoding)
        db.commit()
        
        # Create a temporary file for the encoded sequence
        with tempfile.NamedTemporaryFile(mode='w', suffix='.dna', delete=False) as temp:
            temp.write(dna_sequence)
            temp_path = temp.name
        
        return send_file(
            temp_path,
            as_attachment=True,
            download_name=f"{os.path.splitext(file.filename)[0]}.dna",
            mimetype='text/plain'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if 'temp_path' in locals():
            try:
                os.unlink(temp_path)
            except:
                pass

@app.route('/api/decode', methods=['POST'])
def decode():
    try:
        data = request.get_json()
        if not data or 'sequence' not in data:
            return jsonify({'error': 'No sequence provided'}), 400
        
        sequence = data['sequence']
        
        # Decode the sequence
        text = decode_sequence(sequence)
        
        # Save to database
        db = next(get_db())
        decoding = DNADecoding(
            input_sequence=sequence,
            decoded_text=text
        )
        db.add(decoding)
        db.commit()
        
        return jsonify({
            'text': text,
            'metrics': {
                'length': len(text),
                'original_length': len(sequence)
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/decode/file', methods=['POST'])
def decode_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.dna'):
            return jsonify({'error': 'Invalid file type. Only .dna files are accepted'}), 400
        
        # Read and decode the file content
        sequence = file.read().decode('utf-8')
        text = decode_sequence(sequence)
        
        # Save to database
        db = next(get_db())
        decoding = DNADecoding(
            input_sequence=sequence,
            decoded_text=text
        )
        db.add(decoding)
        db.commit()
        
        # Create a temporary file for the decoded text
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as temp:
            temp.write(text)
            temp_path = temp.name
        
        return send_file(
            temp_path,
            as_attachment=True,
            download_name=f"{os.path.splitext(file.filename)[0]}.txt",
            mimetype='text/plain'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if 'temp_path' in locals():
            try:
                os.unlink(temp_path)
            except:
                pass

@app.route('/api/history', methods=['GET'])
def get_history():
    try:
        db = next(get_db())
        encodings = db.query(DNAEncoding).order_by(DNAEncoding.created_at.desc()).limit(10).all()
        decodings = db.query(DNADecoding).order_by(DNADecoding.created_at.desc()).limit(10).all()
        
        return jsonify({
            'encodings': [
                {
                    'id': e.id,
                    'input_text': e.input_text[:100] + '...' if len(e.input_text) > 100 else e.input_text,
                    'created_at': e.created_at.isoformat()
                } for e in encodings
            ],
            'decodings': [
                {
                    'id': d.id,
                    'input_sequence': d.input_sequence[:100] + '...' if len(d.input_sequence) > 100 else d.input_sequence,
                    'created_at': d.created_at.isoformat()
                } for d in decodings
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True) 