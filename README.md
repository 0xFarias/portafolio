# Portafolio — Jose Luis Farias Valdez

Portafolio web personal de **Jose Luis Farias Valdez**, estudiante de Ingeniería de Software en la Universidad Estatal de Milagro (UNEMI). Presenta mi perfil, mis habilidades técnicas y mis proyectos de desarrollo web con Python y Django y de visión por computador.

> **Estado:** en desarrollo. Proyecto de la asignatura **Desarrollo Web** (Ingeniería de Software, UNEMI).


## Secciones

| Sección | Contenido |
| --- | --- |
| **Inicio** | Nombre, perfil, propuesta de valor y llamadas a la acción. |
| **Sobre mí** | Perfil profesional, formación, certificaciones, intereses e idiomas. |
| **Habilidades** | Cinco categorías (Backend y programación, Bases de datos, IA y visión por computador, Frontend, Cloud y herramientas) con nivel de dominio y evidencia de uso. |
| **Proyectos** | Cuatro proyectos en cards: descripción, problema que resuelven, tecnologías, imagen y enlaces. |
| **Contacto** | Datos de contacto profesional y formulario. |
| **Design System / Componentes** | Página con los tokens y componentes del sitio *(pendiente)*. |

## Proyectos incluidos

| Proyecto | Descripción | Tecnologías | Código |
| --- | --- | --- | --- |
| **AttentionDoctor** | Sistema de atención médica: pacientes, historia clínica, citas, atenciones, recetas y pagos. | Python, Django, PostgreSQL, Tailwind CSS | [Repositorio](https://github.com/0xFarias/AttentionDoctor) |
| **Tracker IA** | Detección en tiempo real de motociclistas sin casco, con dashboard, alertas y reportes PDF. | Python, Django, YOLOv8, OpenCV, WebSockets | [Repositorio](https://github.com/0xFarias/Tracker_IA) |
| **CocoaAnalyzer** | Detección de enfermedades en mazorcas de cacao con visión por computador. | Python, YOLOv11, FastAPI, Roboflow | No publicado |
| **AgendaValoraciones** | Calendario mensual para que los psicólogos de un hospital registren la evolución de sus pacientes. | PHP, MySQL | Privado (datos clínicos) |

## Formación y certificaciones

- **Ingeniería de Software** — Universidad Estatal de Milagro (UNEMI), 2023 – actualidad.
- **Curso completo de Python: desde 0 hasta proyectos con Django** — Udemy, 30 horas, septiembre de 2026. [Ver certificado](https://ude.my/UC-e4451a75-4604-483d-979d-471fdb543c91)
- **AWS Academy Graduate — Cloud Foundations** — octubre de 2025. [Ver insignia en Credly](https://www.credly.com/go/4g2S7dKG)

## Avance del proyecto

- [x] Estructura inicial del repositorio
- [x] HTML semántico de la portada con la información del CV
- [x] Design tokens (paleta Opaline), fuentes y estilos base
- [x] Certificado de Python y Django
- [ ] Layout y componentes reutilizables
- [ ] Estilos de la portada y diseño responsive
- [ ] Interactividad con JavaScript
- [ ] Página Design System / Componentes
- [ ] Publicación en GitHub Pages y capturas

## Tecnologías

- **HTML5 semántico:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `address`, `dialog`, `template`.
- **CSS3 propio (sin frameworks):** custom properties (design tokens), tema claro y oscuro, `clamp()`.
- **Fuentes autoalojadas:** Barlow Condensed, Outfit y JetBrains Mono (licencia OFL).
- **JavaScript:** se incorpora en las próximas versiones.

## Estructura actual

```text
portafolio/
├── index.html              # Portada: inicio, sobre mí, habilidades, proyectos, contacto
├── README.md
├── css/
│   ├── main.css            # Punto de entrada: importa las capas en orden
│   └── base/               # tokens, fuentes, reset, tipografía, utilidades
└── assets/
    ├── fonts/              # woff2 autoalojadas + licencia
    ├── icons/favicon.svg   # logotipo de una tecla
    └── img/                # avatar e ilustraciones de los proyectos
```

## Cómo visualizarlo

Abrir `index.html` en el navegador, o usar la extensión **Live Server** de Visual Studio Code (clic derecho en `index.html` → *Open with Live Server*).
