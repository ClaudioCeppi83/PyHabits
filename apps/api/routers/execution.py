"""
Code execution router for running user code against challenges.
"""
import subprocess
import sys
from typing import Optional

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models import Challenge

router = APIRouter(prefix="/execution", tags=["execution"])

class CodeExecutionRequest(BaseModel):
	"""Request schema for code execution."""
	code: str
	language: str = "python"
	challenge_id: Optional[int] = None

class CodeExecutionResponse(BaseModel):
	"""Response schema for code execution."""
	stdout: str
	stderr: Optional[str] = None
	status: str # "success", "error"

@router.post("/run", response_model=CodeExecutionResponse)
async def run_code(request: CodeExecutionRequest, db: AsyncSession = Depends(get_db)):
	"""
	Execute user code against challenge validation tests.
	"""
	if not request.challenge_id:
		raise HTTPException(
			status_code=400,
			detail="Challenge ID is required for validation"
		)

	result = await db.execute(
		select(Challenge).where(Challenge.id == request.challenge_id)
	)
	challenge = result.scalars().first()
	if not challenge:
		raise HTTPException(status_code=404, detail="Challenge not found")

	# Combine user code with validation code
	full_code = f"{request.code}\n\n{challenge.validation_code}"

	try:
		# Simple subprocess execution (MVP level security - NOT FOR PRODUCTION)
		process = subprocess.run(
			[sys.executable, "-c", full_code],
			capture_output=True,
			text=True,
			timeout=5,
			check=False
		)

		stdout = process.stdout
		stderr = process.stderr

		if process.returncode == 0:
			return CodeExecutionResponse(
				stdout=stdout or "✔ Todos los tests pasaron correctamente.",
				status="success"
			)
		return CodeExecutionResponse(
			stdout=stdout,
			stderr=stderr or "Ocurrió un error inesperado.",
			status="error"
		)

	except subprocess.TimeoutExpired:
		return CodeExecutionResponse(
			stdout="",
			stderr="Error: Tiempo de ejecución excedido (5s max)",
			status="error"
		)
	except Exception as exc:
		return CodeExecutionResponse(
			stdout="",
			stderr=str(exc),
			status="error"
		)
