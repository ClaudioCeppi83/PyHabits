# PyHabit - Arquitectura (MVP 1.0)

## 🧠 Visión General

```mermaid
graph TD
    User((Usuario))

    subgraph Client ["Frontend (Next.js)"]
        UI[UI Components]
        AuthClient[Auth Handler]
        CodeEditor[Monaco/Simple Editor]
    end

    subgraph Server ["Backend (FastAPI)"]
        API[API REST]
        AuthService[Auth Service]
        HabitEngine[Habit Engine]
        ExecService[Execution Service]
    end

    subgraph Data ["Persistence"]
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end

    subgraph Sandbox ["Code Execution"]
        Worker[Celery Worker]
        Docker[Docker Container]
    end

    User --> UI
    UI --> API
    API --> AuthService
    API --> HabitEngine
    API --> ExecService

    AuthService --> DB
    HabitEngine --> DB
    HabitEngine --> Cache

    ExecService --> Worker
    Worker --> Docker
```

## 🛠️ Stack Tecnológico

### Frontend (`apps/web`)

- **Framework**: Next.js 14+ (App Router).
- **Estilos**: Tailwind CSS 3.4+.
- **Componentes**: Headless UI / Radix UI.
- **Iconos**: Lucide React.
- **Editor**: `react-simple-code-editor` o Mónaco (versión ligera).

### Backend (`apps/api`)

- **Framework**: FastAPI (Python 3.11+).
- **ORM**: SQLModel o SQLAlchemy + Pydantic.
- **Baza de Datos**: PostgreSQL 16.
- **Cache/Queue**: Redis 7.

### Infraestructura Local

- **Docker Compose**: Orquestación de API, DB, Redis y Workers.

## 📂 Estructura de Proyecto (Monorepo)

```
pyHabits/
├── apps/
│   ├── web/            # Next.js Frontend
│   └── api/            # FastAPI Backend
├── docs/               # Documentación (Manifesto, Design, Backlog)
├── docker-compose.yml  # Orquestación local
└── README.md
```
