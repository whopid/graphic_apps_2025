from contextlib import asynccontextmanager
from fastapi import FastAPI
from database.connection import init_db, engine
from api.routes.notes import router as notes_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield
    engine.dispose()

app = FastAPI(lifespan=lifespan)
app.include_router(notes_router)

origins = [
    "http://localhost:5173",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)