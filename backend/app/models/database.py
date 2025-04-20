import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Database configuration
DB_TYPE = os.getenv('DB_TYPE', 'sqlite')  # Default to SQLite if not specified

if DB_TYPE == 'postgresql':
    # PostgreSQL configuration
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASS = os.getenv('DB_PASS')
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = os.getenv('DB_PORT')
    
    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
else:
    # SQLite configuration (fallback)
    db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'dna_encoding.db')
    DATABASE_URL = f'sqlite:///{db_path}'

# Create engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserEncoding(Base):
    __tablename__ = "user_encodings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    input_text = Column(Text)
    dna_sequence = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def save_encoding(db, name, email, input_text, dna_sequence):
    encoding = UserEncoding(
        name=name,
        email=email,
        input_text=input_text,
        dna_sequence=dna_sequence
    )
    db.add(encoding)
    db.commit()
    db.refresh(encoding)
    return encoding 