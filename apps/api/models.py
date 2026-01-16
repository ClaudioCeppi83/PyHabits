from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    display_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    sessions = relationship("DailySession", back_populates="user")
    progress = relationship("UserChallenge", back_populates="user")

class DailySession(Base):
    __tablename__ = "daily_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=datetime.utcnow) # Represents the "day"
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="sessions")

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String, default="easy") # easy, medium, hard
    estimated_minutes = Column(Integer, default=5)
    
    # Content
    initial_code = Column(Text, nullable=True) # Starter code for user
    validation_code = Column(Text, nullable=True) # Hidden code to verify logic
    
    progress = relationship("UserChallenge", back_populates="challenge")

class UserChallenge(Base):
    __tablename__ = "user_challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    status = Column(String, default="started") # started, completed
    attempts = Column(Integer, default=0)
    completed_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="progress")
    challenge = relationship("Challenge", back_populates="progress")
