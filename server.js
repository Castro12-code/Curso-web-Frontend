const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Define el puerto dinámico para el entorno de producción o un valor por defecto (8000)
const PORT = process.env.PORT || 8000;

// Nombre de la carpeta generada tras ejecutar `ng build`
const appFolder = 'frontend';

// Ruta absoluta a la carpeta de archivos estáticos
const staticPath = path.join(__dirname, 'dist', appFolder);

// Verifica si la carpeta de archivos estáticos existe
if (!fs.existsSync(staticPath)) {
  console.error(`Error: No se encuentra la carpeta estática en: ${staticPath}`);
  process.exit(1); // Termina el proceso si no encuentra la carpeta
}

// Sirve los archivos estáticos generados en `dist/frontend`
app.use(express.static(staticPath));

// Redirige todas las rutas a `index.html` para que Angular maneje las rutas
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error(`Error: No se encontró index.html en: ${indexPath}`);
    return res.status(404).send('Archivo index.html no encontrado');
  }
  
  // Envía el archivo index.html
  res.sendFile(indexPath, (err) => {
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

