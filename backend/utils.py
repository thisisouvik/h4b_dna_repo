import base64
import json

def encode_text(text, options=None):
    """
    Encode text to DNA sequence using the specified options.
    
    Args:
        text (str): Input text to encode
        options (dict): Encoding options (optional)
        
    Returns:
        str: Encoded DNA sequence
    """
    if options is None:
        options = {}
    
    # Default encoding options
    encoding_map = {
        'A': '00',
        'T': '01',
        'C': '10',
        'G': '11'
    }
    
    # Convert text to binary
    binary = ''.join(format(ord(c), '08b') for c in text)
    
    # Pad binary to make it divisible by 2
    if len(binary) % 2 != 0:
        binary += '0'
    
    # Convert binary to DNA sequence
    dna_sequence = ''
    for i in range(0, len(binary), 2):
        pair = binary[i:i+2]
        for base, code in encoding_map.items():
            if code == pair:
                dna_sequence += base
                break
    
    return dna_sequence

def decode_sequence(sequence):
    """
    Decode DNA sequence back to text.
    
    Args:
        sequence (str): DNA sequence to decode
        
    Returns:
        str: Decoded text
    """
    # Decoding map
    decoding_map = {
        '00': 'A',
        '01': 'T',
        '10': 'C',
        '11': 'G'
    }
    
    # Convert DNA sequence to binary
    binary = ''
    for base in sequence:
        for code, dna_base in decoding_map.items():
            if dna_base == base:
                binary += code
                break
    
    # Convert binary to text
    text = ''
    for i in range(0, len(binary), 8):
        byte = binary[i:i+8]
        if len(byte) == 8:
            text += chr(int(byte, 2))
    
    return text

def calculate_gc_content(sequence):
    """
    Calculate the GC content of a DNA sequence.
    
    Args:
        sequence (str): DNA sequence
        
    Returns:
        float: GC content percentage
    """
    gc_count = sequence.count('G') + sequence.count('C')
    return round((gc_count / len(sequence)) * 100, 2) if sequence else 0

def calculate_stability_score(sequence):
    """
    Calculate a simple stability score for a DNA sequence.
    
    Args:
        sequence (str): DNA sequence
        
    Returns:
        float: Stability score between 0 and 1
    """
    gc_content = calculate_gc_content(sequence)
    return round(gc_content / 100, 2) if sequence else 0

def encode_to_dna(text, options=None):
    """
    Encode text to DNA sequence with optional parameters
    """
    if options is None:
        options = {}
    
    # Convert text to binary
    binary = ''.join(format(ord(char), '08b') for char in text)
    
    # Apply encoding method
    if options.get('encodingMethod') == 'optimized':
        # Use optimized encoding with error correction
        dna_sequence = optimized_encode(binary, options)
    else:
        # Use standard encoding
        dna_sequence = standard_encode(binary)
    
    # Apply compression if requested
    if options.get('compression'):
        dna_sequence = compress_sequence(dna_sequence)
    
    return dna_sequence

def standard_encode(binary):
    """
    Standard binary to DNA encoding
    """
    mapping = {
        '00': 'A',
        '01': 'T',
        '10': 'C',
        '11': 'G'
    }
    
    # Pad binary to be divisible by 2
    if len(binary) % 2 != 0:
        binary += '0'
    
    # Convert binary to DNA
    dna = ''
    for i in range(0, len(binary), 2):
        dna += mapping[binary[i:i+2]]
    
    return dna

def optimized_encode(binary, options):
    """
    Optimized encoding with error correction
    """
    # Add error correction bits
    if options.get('errorCorrection') == 'basic':
        binary = add_basic_error_correction(binary)
    elif options.get('errorCorrection') == 'advanced':
        binary = add_advanced_error_correction(binary)
    
    # Use standard encoding
    return standard_encode(binary)

def add_basic_error_correction(binary):
    """
    Add basic parity check for error correction
    """
    # Add parity bit for each byte
    corrected = ''
    for i in range(0, len(binary), 8):
        byte = binary[i:i+8]
        if len(byte) < 8:
            byte = byte.ljust(8, '0')
        parity = str(byte.count('1') % 2)
        corrected += byte + parity
    return corrected

def add_advanced_error_correction(binary):
    """
    Add advanced error correction using Hamming code
    """
    # Implementation of Hamming code
    # This is a simplified version
    corrected = ''
    for i in range(0, len(binary), 4):
        data = binary[i:i+4]
        if len(data) < 4:
            data = data.ljust(4, '0')
        
        # Calculate parity bits
        p1 = str(int(data[0]) ^ int(data[1]) ^ int(data[3]))
        p2 = str(int(data[0]) ^ int(data[2]) ^ int(data[3]))
        p3 = str(int(data[1]) ^ int(data[2]) ^ int(data[3]))
        
        corrected += p1 + p2 + data[0] + p3 + data[1:4]
    
    return corrected

def compress_sequence(sequence):
    """
    Simple run-length encoding compression
    """
    compressed = ''
    count = 1
    for i in range(1, len(sequence)):
        if sequence[i] == sequence[i-1]:
            count += 1
        else:
            compressed += sequence[i-1] + str(count)
            count = 1
    compressed += sequence[-1] + str(count)
    return compressed

def decode_from_dna(dna_sequence):
    """
    Decode DNA sequence back to text
    """
    # Check if sequence is compressed
    if any(c.isdigit() for c in dna_sequence):
        dna_sequence = decompress_sequence(dna_sequence)
    
    # Convert DNA to binary
    mapping = {
        'A': '00',
        'T': '01',
        'C': '10',
        'G': '11'
    }
    
    binary = ''
    for base in dna_sequence:
        if base in mapping:
            binary += mapping[base]
    
    # Remove padding
    binary = binary.rstrip('0')
    
    # Convert binary to text
    text = ''
    for i in range(0, len(binary), 8):
        byte = binary[i:i+8]
        if len(byte) == 8:
            text += chr(int(byte, 2))
    
    return text

def decompress_sequence(sequence):
    """
    Decompress run-length encoded sequence
    """
    decompressed = ''
    i = 0
    while i < len(sequence):
        base = sequence[i]
        i += 1
        count = ''
        while i < len(sequence) and sequence[i].isdigit():
            count += sequence[i]
            i += 1
        decompressed += base * int(count)
    return decompressed

def format_output(text, format_type='text'):
    """
    Format output based on requested format
    """
    if format_type == 'json':
        return json.dumps({'text': text}, indent=2)
    elif format_type == 'csv':
        return f'text\n"{text}"'
    else:
        return text 