# DNA Encoder Application

Digital files into biologically viable DNA sequences using our ML-powered DNA Data Storage technology

## Deployment Instructions

### Backend Deployment (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Environment Variables:
     ```
     DB_TYPE=postgresql
     DB_NAME=your_db_name
     DB_USER=your_db_user
     DB_PASS=your_db_password
     DB_HOST=your_db_host
     DB_PORT=5432
     ```

### Frontend Deployment (Render.com)

1. Create a new Static Site on Render.com
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Environment Variables:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```

## Local Development

### Backend
1. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Run the server:
   ```bash
   python app.py
   ```

### Frontend
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Run the development server:
   ```bash
   npm start
   ```

## Features
- Text to DNA encoding
- DNA to text decoding
- History tracking
- Multiple output formats
- File upload/download


 
