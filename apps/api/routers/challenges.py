from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from database import get_db
from models import Challenge
from pydantic import BaseModel

router = APIRouter(prefix="/challenges", tags=["challenges"])

class ChallengeResponse(BaseModel):
    id: int
    title: str
    description: str
    difficulty: str
    estimated_minutes: int
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[ChallengeResponse])
async def get_challenges(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Challenge))
    challenges = result.scalars().all()
    return challenges

@router.get("/{challenge_id}", response_model=ChallengeResponse)
async def get_challenge(challenge_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Challenge).where(Challenge.id == challenge_id))
    challenge = result.scalars().first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return challenge

# TODO: Add logic to get "Daily Challenge" specifically (e.g. via user progress)
