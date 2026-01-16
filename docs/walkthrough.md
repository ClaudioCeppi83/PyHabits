# Verificación de Flujo (Walkthrough) - MVP 1.0

Este documento describe el "Happy Path" verificado para el MVP de PyHabit.

## 1. Entrada y Auth

- **Acción**: Usuario entra a `/login`.
- **Resultado**: Ve el layout dividido con la frase motivacional.
- **Acción**: Ingresa datos y da clic en "Entrar".
- **Resultado**: Redirección exitosa a `/dashboard`.

## 2. Dashboard (Home)

- **Estado Visual**:
  - Sidebar visible a la izquierda (Desktop) o Menú inferior (Móvil).
  - Saludo personalizado ("Hola, Claudio").
  - Tarjeta de "Reto del día" destacada.
  - Contadores de Racha y Retos mostrados correctamente.
- **Interacción**:
  - Clic en el botón de tema (Sol/Luna) cambia la paleta de colores instantáneamente.

## 3. Flujo de Reto

- **Acción**: Clic en "Empezar Reto".
- **Resultado**: Navegación a `/dashboard/challenge/1`.
- **Componentes**:
  - Editor de código (JetBrains Mono) cargado con `def check_number(n): pass`.
  - Panel de instrucciones a la derecha.
  - Consola vacía esperando ejecución.
- **Pistas**:
  - Clic en "Ver siguiente pista" despliega ayuda progresiva sin bloquear.

## 4. Ejecución de Código

- **Caso: Fallo**
  - **Acción**: Ejecutar código vacío o incorrecto.
  - **Resultado**: Estado "Running" -> "Error". Consola muestra mensaje de fallo en rojo.
- **Caso: Éxito**
  - **Acción**: Escribir solución correcta:
    ```python
    def check_number(n):
        if n > 10:
            return "Mayor"
        return "Menor"
    ```
  - **Resultado**: Estado "Running" -> "Success". Consola muestra "Test Pasado" en verde.

## 5. Próximos Pasos (Limbo)

Actualmente, tras el éxito, el usuario permanece en la pantalla.

- **Mejora Fase 2**: Redirigir a una pantalla de "Día Completado" con animación de celebración.
