# PyHabit - MVP

Bienvenido al repositorio de **PyHabit**.
Este proyecto es una plataforma para construir el hábito de programar en Python mediante micro-retos diarios.

## 🚀 Cómo Iniciar (Desarrollo)

### 1. Infraestructura (Base de Datos + Redis)

Asegúrate de tener Docker instalado y ejecutándose.

```bash
docker-compose up -d db redis
```

### 2. Backend (API)

Navega a la carpeta de la API e instala las dependencias.

```bash
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

La API estará disponible en: `http://localhost:8000`
Documentación automática: `http://localhost:8000/docs`

### 3. Frontend (Web)

Navega a la carpeta web e inicia el servidor de desarrollo.

```bash
cd apps/web
npm install
npm run dev
```

La web estará disponible en: `http://localhost:3000`

## 🧪 Verificación del MVP

Sigue estos pasos para validar el flujo principal:

1.**Login**: Ve a `/login`. (Por ahora es simulado, cualquier email/pass funciona).
2.**Dashboard**: Verás tu racha y el reto del día.
3.**Reto**: Haz clic en "Empezar Reto".
4.**Editor**:
    - Escribe el código solicitado (ej: `if n > 10: return "Mayor"`).
    - Haz clic en "Ejecutar".
    - Verás el resultado en la consola simulada.
5.**Ajustes**: Prueba el cambio de tema (Claro/Oscuro) en el sidebar.

## 📂 Estructura

- `apps/web`: Frontend (Next.js 14, Tailwind).
- `apps/api`: Backend (FastAPI, SQLAlchemy).
- `docs/`: Documentación de producto y arquitectura.
