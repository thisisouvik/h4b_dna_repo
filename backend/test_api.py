import requests
import json
import os
import tempfile
import time

BASE_URL = 'http://localhost:5000'

def test_encode_text():
    print("\nTesting text encoding...")
    data = {
        'text': 'Hello, DNA!',
        'options': {
            'encoding': 'binary'
        }
    }
    response = requests.post(f'{BASE_URL}/api/encode', json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_encode_file():
    print("\nTesting file encoding...")
    temp_input = None
    temp_output = None
    try:
        # Create input file
        temp_input = tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False)
        temp_input.write('Hello from file!')
        temp_input.close()
        
        # Send request
        with open(temp_input.name, 'rb') as file:
            response = requests.post(
                f'{BASE_URL}/api/encode/file',
                files={'file': file}
            )
        
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            # Save response to temporary file
            temp_output = tempfile.NamedTemporaryFile(mode='wb', suffix='.dna', delete=False)
            temp_output.write(response.content)
            temp_output.close()
            print(f"Encoded file saved to: {temp_output.name}")
        else:
            print(f"Response: {response.json()}")
        
        return response.status_code == 200
    
    finally:
        # Clean up temporary files
        if temp_input and os.path.exists(temp_input.name):
            try:
                os.unlink(temp_input.name)
            except Exception as e:
                print(f"Warning: Could not delete temporary input file: {e}")
        
        if temp_output and os.path.exists(temp_output.name):
            try:
                os.unlink(temp_output.name)
            except Exception as e:
                print(f"Warning: Could not delete temporary output file: {e}")

def test_decode_text():
    print("\nTesting text decoding...")
    data = {
        'sequence': 'ATCGATCGATCG'
    }
    response = requests.post(f'{BASE_URL}/api/decode', json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_decode_file():
    print("\nTesting file decoding...")
    temp_input = None
    temp_output = None
    try:
        # Create input file
        temp_input = tempfile.NamedTemporaryFile(mode='w', suffix='.dna', delete=False)
        temp_input.write('ATCGATCGATCG')
        temp_input.close()
        
        # Send request
        with open(temp_input.name, 'rb') as file:
            response = requests.post(
                f'{BASE_URL}/api/decode/file',
                files={'file': file}
            )
        
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            # Save response to temporary file
            temp_output = tempfile.NamedTemporaryFile(mode='wb', suffix='.txt', delete=False)
            temp_output.write(response.content)
            temp_output.close()
            print(f"Decoded file saved to: {temp_output.name}")
        else:
            print(f"Response: {response.json()}")
        
        return response.status_code == 200
    
    finally:
        # Clean up temporary files
        if temp_input and os.path.exists(temp_input.name):
            try:
                os.unlink(temp_input.name)
            except Exception as e:
                print(f"Warning: Could not delete temporary input file: {e}")
        
        if temp_output and os.path.exists(temp_output.name):
            try:
                os.unlink(temp_output.name)
            except Exception as e:
                print(f"Warning: Could not delete temporary output file: {e}")

def test_history():
    print("\nTesting history endpoint...")
    response = requests.get(f'{BASE_URL}/api/history')
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def run_tests():
    tests = [
        test_encode_text,
        test_encode_file,
        test_decode_text,
        test_decode_file,
        test_history
    ]
    
    results = []
    for test in tests:
        try:
            results.append(test())
            # Add a small delay between tests
            time.sleep(0.5)
        except Exception as e:
            print(f"Error in test: {str(e)}")
            results.append(False)
    
    print("\nTest Results:")
    for i, result in enumerate(results):
        print(f"Test {i+1}: {'PASS' if result else 'FAIL'}")
    
    return all(results)

if __name__ == '__main__':
    run_tests() 