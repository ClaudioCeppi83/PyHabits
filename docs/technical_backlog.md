# PyHabit - Backlog Técnico (MVP 1.0)

## 📌 Objetivo del MVP

Validar que reduciendo la fricción y reforzando el hábito, el usuario vuelve a programar.

## 🧭 Historias de Usuario & Endpoints

### 1. Login / Registro

**Historia**: "Como usuario quiero entrar rápido para no perder motivación."

- **Endpoints**:
  - `POST /auth/register` (Email + Password)
  - `POST /auth/login` (Retorna JWT)
  - `GET /auth/me` (Valida token y retorna usuario)

### 2. Home Diaria

**Historia**: "Como usuario quiero saber qué hacer hoy sin pensar."

- **Endpoints**:
  - `GET /daily/session` (Estado del día actual: completado o pendiente)
  - `GET /daily/challenge` (Obtiene el reto asignado para hoy)

### 3. Contexto del Reto

**Historia**: "Como usuario quiero entender el reto antes de empezar."

- **Endpoints**:
  - `GET /challenges/{id}` (Título, descripción humana, dificultad)

### 4. Reto Activo (Editor & Ejecución)

**Historia**: "Como usuario quiero escribir y ejecutar código sin fricción."

- **Endpoints**:
  - `POST /challenges/{id}/start` (Marca inicio de intento)
  - `POST /code/execute` (Envía código -> Docker Sandbox -> Resultado)

### 5. Pistas Progresivas

**Historia**: "Como usuario quiero ayuda gradual sin que me den la solución."

- **Endpoints**:
  - `GET /challenges/{id}/hints?level=1` (Conceptual)
  - `GET /challenges/{id}/hints?level=2` (Ejemplo parcial)
  - `GET /challenges/{id}/hints?level=3` (Sugerencia directa)

### 6. Resultado & Validación

**Historia**: "Como usuario quiero saber si voy bien sin sentirme tonto."

- **Endpoints**:
  - `POST /challenges/{id}/submit` (Verifica solución final)

### 7. Completar Día

**Historia**: "Como usuario quiero sentir que el día cuenta."

- **Endpoints**:
  - `POST /daily/complete` (Actualiza racha, marca día como hecho)

### 8. Ajustes

**Historia**: "Como usuario quiero que PyHabit se vea como me gusta."

- **Endpoints**:
  - `GET /user/settings`
  - `PUT /user/settings` (Tema: light/dark/auto)

## 🧠 Criterios de Aceptación Globales (MVP)

1.  **Hábito Primero**: Si el usuario ejecutó código al menos una vez, el día cuenta (aunque no complete el reto perfecto, se puede considerar "intento válido").
2.  **Feedback Positivo**: Mensajes de error amigables, nunca técnicos/crudos del compilador si se pueden evitar.
3.  **Simplicidad**: Ninguna pantalla tiene más de una acción principal (CTA único).
