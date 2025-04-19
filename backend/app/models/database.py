from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# Create SQLite database in the project root
db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'dna_encoding.db')
engine = create_engine(f'sqlite:///{db_path}')
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