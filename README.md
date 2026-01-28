# Financie Group - Landing Reclutamiento

Esta es la landing page oficial de Reclutamiento para **Financie Group / Experior**, enfocada en atraer agentes de seguros latinos en EE.UU.

## 🚀 Características

- **Enfoque en Reclutamiento**: Mensajes clave sobre libertad, propiedad (vesting) y crecimiento.
- **Comparativa Interactiva**: Tabla "Experior vs. Agencia Tradicional".
- **Video Hero**: Integración de video principal con optimización de carga (CDN Friendly).
- **FAQ**: Sección de preguntas frecuentes para agentes.
- **Rendimiento**: Construido con React + Vite para máxima velocidad.

## 🛠️ Tecnologías

- **React 18+**
- **Vite** (Build tool)
- **TailwindCSS** (Estilos)
- **GSAP** (Animaciones)
- **Lucide React** (Iconografía)

## 📦 Instalación y Desarrollo

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/developer-berion/reclutamiento.git
    cd reclutamiento
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Correr en local**:
    ```bash
    npm run dev
    ```

## 🚢 Despliegue (Hostinger)

El proyecto está configurado con `base: '/reclutamiento/'` en `vite.config.js`.

1.  Ejecutar build:
    ```bash
    npm run build
    ```
2.  Subir el contenido de la carpeta `dist/` al directorio `/reclutamiento` en el File Manager de Hostinger.
3.  **Importante**: Asegurarse de habilitar el **CDN** en el hPanel para una carga óptima del video.

## 🎥 Gestión de Video

El video principal se encuentra en `public/reclutamiento.mp4`.
- **Formato**: MP4 (H.264)
- **Carga**: Se utiliza `preload="auto"` para aprovechar el streaming por rangos (Range Requests) del servidor/CDN.

---
© 2024 Financie Group. Todos los derechos reservados.
