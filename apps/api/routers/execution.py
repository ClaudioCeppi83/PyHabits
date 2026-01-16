from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/execution", tags=["execution"])

class CodeExecutionRequest(BaseModel):
    code: str
    language: str = "python"
    challenge_id: Optional[int] = None

class CodeExecutionResponse(BaseModel):
    stdout: str
    stderr: Optional[str] = None
    status: str # "success", "error"

@router.post("/run", response_model=CodeExecutionResponse)
async def run_code(request: CodeExecutionRequest):
    # MVP 1.0: MOCK EXECUTION
    # WARNING: This does NOT actually execute code yet. 
    # Real implementation requires Celery + Docker.
    
    # Mock validation logic for demo purposes
    if "return \"Mayor\"" in request.code and "if n > 10" in request.code:
         return CodeExecutionResponse(
            stdout="✔ Test Pasado: check_number(11) -> 'Mayor'\n✔ Test Pasado: check_number(5) -> 'Menor'",
            status="success"
        )
    elif "def check_number" in request.code:
        return CodeExecutionResponse(
            stdout="Running tests...\n✘ Failed: Expected 'Mayor', got None",
            stderr="AssertionError: wrong return value",
            status="error"
        )
    else:
        return CodeExecutionResponse(
            stdout="",
            stderr="SyntaxError: unexpected EOF while parsing",
            status="error"
        )
