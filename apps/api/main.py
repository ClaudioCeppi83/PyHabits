from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth, challenges, execution

# Initialize Tables (For MVP, using auto-create. Prod should use Alembic)
# Note: In async, typical to use logic on startup event
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="PyHabit API", version="0.1.0", lifespan=lifespan)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO: Set to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(challenges.router)
app.include_router(execution.router)

@app.get("/")
async def root():
    return {"message": "Welcome to PyHabit API", "status": "active"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
