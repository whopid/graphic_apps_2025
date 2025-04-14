from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.schemas import Base

DATABASE_URL = "postgresql://user_notes:123@localhost/my_notes"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
