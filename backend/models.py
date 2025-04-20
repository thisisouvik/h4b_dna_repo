from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

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
    DATABASE_URL = 'sqlite:///dna_encoder.db?check_same_thread=False'

# Create engine with thread-local storage
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DNAEncoding(Base):
    __tablename__ = "dna_encodings"

    id = Column(Integer, primary_key=True)
    input_text = Column(Text, nullable=False)
    encoded_sequence = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<DNAEncoding {self.id}>'

class DNADecoding(Base):
    __tablename__ = "dna_decodings"

    id = Column(Integer, primary_key=True)
    input_sequence = Column(Text, nullable=False)
    decoded_text = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<DNADecoding {self.id}>'

# Create all tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 