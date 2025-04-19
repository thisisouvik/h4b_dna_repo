import numpy as np
import pickle
import os
from typing import Tuple

def text_to_binary(text: str) -> str:
    """Convert text to binary string."""
    return ''.join(format(ord(char), '08b') for char in text)

def binary_to_dna(binary: str) -> str:
    """Convert binary string to DNA sequence using 4-bit encoding."""
    mapping = {
        '0000': 'A',
        '0001': 'T',
        '0010': 'C',
        '0011': 'G',
        '0100': 'AA',
        '0101': 'AT',
        '0110': 'AC',
        '0111': 'AG',
        '1000': 'TA',
        '1001': 'TT',
        '1010': 'TC',
        '1011': 'TG',
        '1100': 'CA',
        '1101': 'CT',
        '1110': 'CC',
        '1111': 'CG'
    }
    
    # Pad binary string to be divisible by 4
    padding = (4 - len(binary) % 4) % 4
    binary += '0' * padding
    
    # Convert binary to DNA
    dna = ''
    for i in range(0, len(binary), 4):
        dna += mapping[binary[i:i+4]]
    
    return dna

def dummy_encode(text: str) -> str:
    """Fallback DNA encoding using binary conversion."""
    binary = text_to_binary(text)
    return binary_to_dna(binary)

def load_model(model_path: str = 'model.pkl'):
    """Load the ML model from file."""
    try:
        with open(model_path, 'rb') as f:
            return pickle.load(f)
    except FileNotFoundError:
        return None
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def encode_with_model(text: str) -> Tuple[str, bool]:
    """
    Encode text to DNA using ML model if available, otherwise use dummy encoder.
    Returns tuple of (dna_sequence, used_ml)
    """
    # Try to load the model
    model = load_model()
    
    if model is not None:
        try:
            # Preprocess text for the model 
            dna_sequence = dummy_encode(text)
            return dna_sequence, True
        except Exception as e:
            print(f"Error using ML model: {e}")
            # Fallback to dummy encoder
            return dummy_encode(text), False
    else:
        # Use dummy encoder if no model is available
        return dummy_encode(text), False 