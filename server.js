const express = require('express');
const path = require('path');

const app = express();

// Define el puerto dinámico para el entorno de producción o un valor por defecto (8000)
const PORT = process.env.PORT || 8000;

// Nombre de la carpeta generada tras ejecutar `ng build`
const appFolder = 'frontend';

// Ruta absoluta a la carpeta de archivos estáticos
const staticPath = path.join(__dirname, 'dist', appFolder);

// Verifica si los archivos estáticos existen
if (!require('fs').existsSync(staticPath)) {
  console.error(`Error: No se encuentra la carpeta estática en: ${staticPath}`);
  process.exit(1); // Termina el proceso si no encuentra la carpeta
}

// Sirve los archivos estáticos generados en `dist/frontend`
app.use(express.static(staticPath));

// Redirige todas las rutas a `index.html`
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error al enviar index.html:', err);
      res.status(500).send('Error al cargar la aplicación.');
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Angular app is running on port ${PORT}`);
});
