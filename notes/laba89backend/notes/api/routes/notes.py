from fastapi import APIRouter, Depends
from sqlalchemy import desc, asc
from sqlalchemy.orm import Session
from core.models import NoteCreate, NoteResponse
from database.connection import get_db
from core.schemas import Note

router = APIRouter(prefix="/notes", tags = ["Заметки"])

@router.post(
    "/",
    summary="Создать новую заметку",
    response_model=NoteResponse)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    db_note = Note(title=note.title, description=note.description)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.get(
    "/",
    summary="Получить все заметки",
    response_model=list[NoteResponse]
)
def read_notes(
        search: str | None = None,
        sort_item: str | None = None,
        sort_order: str | None = None,
        db: Session = Depends(get_db)
):
    result = None
    notes = db.query(Note)
    sorted_field = Note.created_at
    options = {
        "created_at": Note.created_at,
        "id": Note.id,
        "title": Note.title,
        "description": Note.description
    }

    if all([not search, not sort_item, not sort_order]):
        return notes.all()
    if search:
        notes = notes.filter(Note.title.like(f"%{search}%"))
    if sort_item:
        sorted_field = options[sort_item]

    target_func = desc

    if sort_order:
        target_func = desc if sort_order == "desc" else asc

    notes = notes.order_by(target_func(sorted_field))
    return notes.all()
