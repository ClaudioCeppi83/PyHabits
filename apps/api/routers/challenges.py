"""
Challenges router for listing and retrieving coding tasks.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel

from database import get_db
from models import Challenge

router = APIRouter(prefix="/challenges", tags=["challenges"])

class ChallengeResponse(BaseModel):
    """
    Response schema for a challenge.
    """
    id: int
    title: str
    description: str
    difficulty: str
    estimated_minutes: int
    initial_code: str | None = None

    class Config:
        """Pydantic config."""
        from_attributes = True

@router.get("/", response_model=List[ChallengeResponse])
async def get_challenges(db: AsyncSession = Depends(get_db)):
    """
    List all available challenges.
    """
    result = await db.execute(select(Challenge))
    challenges = result.scalars().all()
    return challenges

@router.get("/daily", response_model=ChallengeResponse)
async def get_daily_challenge(db: AsyncSession = Depends(get_db)):
    """
    Retrieve the daily challenge for the user.
    """
    # Simple logic: Return the first challenge for now as daily
    result = await db.execute(select(Challenge).limit(1))
    challenge = result.scalars().first()
    if not challenge:
        raise HTTPException(status_code=404, detail="No challenges found")
    return challenge

@router.get("/{challenge_id}", response_model=ChallengeResponse)
async def get_challenge(challenge_id: int, db: AsyncSession = Depends(get_db)):
    """
    Get a specific challenge by ID.
    """
    result = await db.execute(select(Challenge).where(Challenge.id == challenge_id))
    challenge = result.scalars().first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return challenge
