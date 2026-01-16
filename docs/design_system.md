# PyHabit - Sistema de Diseño

## 🧠 Principios Visuales

- **Calma, Foco, Claridad**: El diseño debe invitar a la concentración.
- **Cero Ruido Visual**: Eliminar elementos decorativos innecesarios.
- **El Código es Protagonista**: El editor y el resultado son el centro de atención.
- **El diseño acompaña, no distrae**: La interfaz debe ser "transparente".

## ✒️ Tipografía

### UI / Texto: **Inter**

- **Uso**: Títulos, botones, textos explicativos, interfaz general.
- **Características**: Alta legibilidad, neutral, moderna. Funciona perfecto en desktop y móvil.
- **Pesos**:
  - Regular (400)
  - Medium (500)
  - SemiBold (600)

### Código: **JetBrains Mono**

- **Uso**: Editor de código, snippets, logs, terminal.
- **Características**: Optimizada para lectura de código, diferenciación clara de caracteres, sensación profesional.

## 🎨 Paleta de Colores

### 🌞 Modo Claro (Productivo, Limpio)

| Elemento             | Color          | Hex       | Referencia Tailwind |
| :------------------- | :------------- | :-------- | :------------------ |
| **Fondo Principal**  | Gris muy suave | `#F9FAFB` | `bg-gray-50`        |
| **Superficie**       | Blanco Puro    | `#FFFFFF` | `bg-white`          |
| **Texto Principal**  | Gris Oscuro    | `#111827` | `text-gray-900`     |
| **Texto Secundario** | Gris Medio     | `#6B7280` | `text-gray-500`     |
| **Primario/Acción**  | Azul Vibrante  | `#2563EB` | `bg-blue-600`       |
| **Éxito**            | Verde Natural  | `#16A34A` | `text-green-600`    |
| **Advertencia**      | Ámbar Suave    | `#F59E0B` | `text-amber-500`    |

### 🌙 Modo Oscuro (Hacker Suave, Foco Nocturno)

| Elemento             | Color              | Hex       | Referencia Tailwind |
| :------------------- | :----------------- | :-------- | :------------------ |
| **Fondo Principal**  | Azul/Gris Profundo | `#0F172A` | `bg-slate-900`      |
| **Superficie**       | Casi Negro         | `#020617` | `bg-slate-950`      |
| **Texto Principal**  | Blanco Suave       | `#E5E7EB` | `text-gray-200`     |
| **Texto Secundario** | Gris Medio         | `#9CA3AF` | `text-gray-400`     |
| **Primario/Acción**  | Azul Brillante     | `#3B82F6` | `bg-blue-500`       |
| **Éxito**            | Verde Neón Suave   | `#22C55E` | `text-green-500`    |

## 🔘 Componentes Clave

### Botones

- **Primario**: `Rounded-lg`, Color Primario, Texto Claro. Hover suave (no agresivo).
- **Secundario**: Borde visible, Fondo transparente. Nunca compite con el primario.

### Feedback

- Mensajes con Texto + Icono.
- **Evitar**: Modales rojos agresivos o mensajes de "Error Fatal".
- **Usar**: Lenguaje humano y constructivo ("Casi", "Intenta de nuevo").
