"""
Seed script to populate initial challenges.
"""
import asyncio
from sqlalchemy.future import select
from database import AsyncSessionLocal
from models import Challenge

async def seed_challenges():
	"""Populate the database with initial challenges."""
	challenges = [
		{
			"title": "Condicionales Simples",
			"description": (
				"Crea una función llamada `check_number(n)` que devuelva "
				"'Mayor' si n es mayor a 10, de lo contrario devuelve 'Menor'."
			),
			"difficulty": "easy",
			"estimated_minutes": 5,
			"initial_code": "def check_number(n):\n    # Escribe tu código aquí\n    pass",
			"validation_code": (
				"assert check_number(15) == 'Mayor'\n"
				"assert check_number(5) == 'Menor'"
			)
		},
		{
			"title": "Sumar una Lista",
			"description": (
				"Escribe una función `sum_list(items)` que sume todos "
				"los números en una lista."
			),
			"difficulty": "easy",
			"estimated_minutes": 3,
			"initial_code": "def sum_list(items):\n    return 0",
			"validation_code": (
				"assert sum_list([1, 2, 3]) == 6\n"
				"assert sum_list([]) == 0"
			)
		},
		{
			"title": "Filtrar Pares",
			"description": (
				"Escribe una función `get_evens(items)` que devuelva "
				"una lista solo con los números pares."
			),
			"difficulty": "medium",
			"estimated_minutes": 8,
			"initial_code": "def get_evens(items):\n    return []",
			"validation_code": (
				"assert get_evens([1, 2, 3, 4]) == [2, 4]\n"
				"assert get_evens([1, 3, 5]) == []"
			)
		}
	]

	async with AsyncSessionLocal() as session:
		for ch_data in challenges:
			# Check if exists
			result = await session.execute(
				select(Challenge).where(Challenge.title == ch_data["title"])
			)
			if result.scalars().first():
				print(f"Challenge '{ch_data['title']}' already exists.")
				continue

			challenge = Challenge(**ch_data)
			session.add(challenge)

		await session.commit()
		print("Challenges seeded successfully!")

if __name__ == "__main__":
	asyncio.run(seed_challenges())
