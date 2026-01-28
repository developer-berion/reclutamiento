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

El proyecto está configurado con `base: '/agentes/'` en `vite.config.js`.

1.  Ejecutar build:
    ```bash
    npm run build
    ```
2.  Subir el contenido de la carpeta `dist/` al directorio `/agentes` en el File Manager de Hostinger.

## 🎥 Gestión de Video

El video principal está integrado mediante **Bunny Stream** para garantizar una reproducción fluida y de alta calidad (4K/HD adaptativo).

- **Proveedor**: Bunny.net (Bunny Stream).
- **ID de Video**: `1e79e76e-1ba4-4572-b7c1-cf5ea20be16c`.
- **Autoplay**: El video se reproduce automáticamente al abrir el modal para una experiencia de usuario inmediata.
- **Protección**: Se recomienda configurar "Allowed Origins" en el panel de Bunny Stream para restringir la reproducción a `financiegroup.com`.

---
© 2024 Financie Group. Todos los derechos reservados.
