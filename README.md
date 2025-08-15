<div align="center">
  <img src="images/VALD.png" alt="VALD - Vuelta a los Durmientes" width="280" height="180">
  
  # VALD — Vuelta a los Durmientes 2025
  
  **Sitio web oficial de la carrera de ultraciclismo más desafiante de México**
  
  [![Evento](https://img.shields.io/badge/Fecha-16%20Agosto%202025-orange)](https://vald.izignamx.com)
  [![Distancia](https://img.shields.io/badge/Distancia-317%20km-blue)](https://vald.izignamx.com)
  [![Desnivel](https://img.shields.io/badge/Desnivel-4800%20m-red)](https://vald.izignamx.com)
  [![Participantes](https://img.shields.io/badge/Corredores-117-green)](https://vald.izignamx.com/corredores.html)
</div>

## 📋 Descripción

Sitio web oficial para **VALD - Vuelta a los Durmientes 2025**, una carrera de ultraciclismo autosuficiente que se llevará a cabo el 16 de agosto de 2025 a las 00:00 hrs. El recorrido de 317 km con 4800 m de desnivel acumulado representa uno de los desafíos ciclísticos más exigentes de México.

### 🏁 Detalles del Evento

- **📅 Fecha**: 16 de agosto de 2025
- **🕛 Hora de salida**: 00:00 hrs (GMT-6)
- **📍 Salida**: Pirámide de San Gregorio
- **🏁 Meta**: La Gallera 129, Santa Cruz Acalpixca, Xochimilco
- **🚴 Modalidad**: Ultraciclismo autosuficiente
- **👥 Participantes**: 117 corredores confirmados
- **⏱️ Tiempo límite**: 24 horas

## 🚀 Inicio Rápido

### Prerrequisitos

- Python 3.x instalado en tu sistema
- Navegador web moderno

### Instalación y Ejecución Local

1. **Clona o descarga el repositorio**
   ```bash
   # Si tienes acceso al repositorio
   git clone [URL_DEL_REPOSITORIO]
   cd vald.izignamx.com
   ```

2. **Inicia el servidor local**
   ```bash
   # Usando Python 3
   python -m http.server 8000
   
   # O usando Python 2 (si es necesario)
   python -m SimpleHTTPServer 8000
   ```

3. **Abre en tu navegador**
   ```
   http://localhost:8000
   ```

### URLs Disponibles

- **Página principal**: `http://localhost:8000/`
- **Lista de corredores**: `http://localhost:8000/corredores.html`
- **Archivo GPX**: `http://localhost:8000/route/vald.gpx`

## 📁 Estructura del Proyecto

```
vald.izignamx.com/
├── 📄 index.html              # Página principal
├── 📄 corredores.html         # Lista de participantes
├── 📄 corredores.txt          # Datos de corredores (TSV)
├── 🎨 styles.css              # Estilos principales
├── 🎨 styles.min.css          # Estilos minificados
├── ⚙️ sw.js                   # Service Worker
├── 📄 site.webmanifest        # Manifiesto PWA
├── 🤖 robots.txt              # Directivas para crawlers
├── 🗺️ sitemap.xml             # Mapa del sitio
├── 📁 images/                 # Recursos gráficos
│   ├── VALD.png              # Logo principal
│   ├── valley.jpg            # Imagen de fondo
│   ├── ruta-completa.png     # Mapa de ruta
│   ├── altimetria.png        # Perfil altimétrico
│   └── promo.jpg             # Imagen promocional
├── 📁 sponsors/               # Logos de patrocinadores
├── 📁 route/                  # Archivos de ruta
│   └── vald.gpx              # Archivo GPS
├── 📁 data/                   # Datos JSON
│   └── sponsors.json         # Información de sponsors
└── 📁 .well-known/            # Configuraciones web
```

## ✨ Características Técnicas

### 🎯 **Funcionalidades Principales**

- **⏰ Contador Regresivo**: Cuenta regresiva hasta el inicio de la carrera con efectos especiales
- **🎆 Efectos Especiales**: Confeti y fuegos artificiales al llegar a cero
- **📱 Diseño Responsive**: Optimizado para todos los dispositivos
- **🚀 PWA Ready**: Progressive Web App con Service Worker
- **📊 Lista de Corredores**: 117 participantes organizados por categoría
- **🗺️ Ruta Interactiva**: Mapa completo y perfil altimétrico
- **📍 Descarga GPX**: Archivo de ruta para dispositivos GPS

### 🛠️ **Optimizaciones Implementadas**

- **⚡ Performance**:
  - CSS minificado y optimizado
  - Lazy loading de imágenes
  - Service Worker para cache offline
  - Preload de recursos críticos

- **🔍 SEO Avanzado**:
  - Meta tags completos
  - Structured Data (Schema.org)
  - Open Graph y Twitter Cards
  - Sitemap XML automático

- **♿ Accesibilidad**:
  - ARIA labels y roles semánticos
  - Alt text descriptivo
  - Navegación por teclado
  - Contraste optimizado

- **📊 Analytics**:
  - Google Analytics 4 integrado
  - Tracking de eventos personalizado

## 🎨 Paleta de Colores

```css
:root {
  --vald-bg: #120B03;        /* Fondo principal */
  --vald-h1: #CFA478;        /* Títulos */
  --vald-body: #B49574;      /* Texto principal */
  --vald-accent: #00D4FF;    /* Acentos */
  --vald-lava: #D2491A;      /* Elementos destacados */
  --vald-sun: #B8860B;       /* Detalles dorados */
}
```

## 🔧 Configuración del Contador

### Modificar Fecha del Evento

Para cambiar la fecha objetivo del contador regresivo, edita la línea en `index.html`:

```javascript
const RACE_START_DATE = new Date('2025-08-16T00:00:00-06:00');
```

### Probar Efectos Especiales

Para probar inmediatamente los efectos:

1. **Cambiar fecha a 10 segundos**:
   ```javascript
   const RACE_START_DATE = new Date(Date.now() + 10000);
   ```

2. **Activar manualmente** (consola del navegador):
   ```javascript
   startCelebration();
   ```

## 📊 Datos de Corredores

El archivo `corredores.txt` contiene la lista de participantes en formato TSV:

```
[Número]\t[Nombre]\t[Categoría]
1\tAxel Armando Del Arco\tVaronil
2\tAlan Zepeda Casas\tVaronil
...
```

**Estadísticas actuales**:
- 👥 **Total**: 117 corredores
- 👨 **Varonil**: 106 participantes
- 👩 **Femenil**: 11 participantes

## 🌐 Deployment

El sitio está optimizado para ser servido desde cualquier servidor web estático:

- **Netlify**: Drag & drop de la carpeta
- **Vercel**: Conexión directa con Git
- **GitHub Pages**: Push al repositorio
- **Servidor tradicional**: Upload vía FTP/SFTP

## 📱 PWA Features

- ✅ Manifiesto web configurado
- ✅ Service Worker implementado
- ✅ Cache offline inteligente
- ✅ Iconos para todas las plataformas
- ✅ Instalable en dispositivos móviles

## 🤝 Contribuciones

Este es un repositorio privado para el evento VALD 2025. Para modificaciones o mejoras, contacta directamente con el equipo de desarrollo.

## 📞 Contacto

- **Organización**: El Rey de la Montaña
- **Instagram**: [@el.rey.de.la.montana](https://www.instagram.com/el.rey.de.la.montana)
- **Teléfonos**: 
  - +52 492 900 3932
  - +52 1 55 6191 3650

## 📄 Licencia

Todos los derechos reservados © 2025 El Rey de la Montaña

---

<div align="center">
  <p><strong>Desarrollado con ❤️ por</strong></p>
  <a href="https://izignamx.com" target="_blank">
    <img src="sponsors/izignamx.png" alt="IzignaMx" width="120">
  </a>
  <br>
  <a href="https://izignamx.com" target="_blank"><strong>IzignaMx</strong></a>
  <br>
  <em>Desarrollo web profesional y soluciones digitales</em>
</div>