const express = require('express');
const path = require('path');

const app = express();

// Define el puerto. Koyeb proporcionará el puerto en `process.env.PORT`.
const PORT = process.env.PORT || 8000;

// Nombre de la carpeta generada tras ejecutar `ng build`
const appFolder = 'frontend';

// Sirve los archivos estáticos generados en `dist/frontend`
app.use(express.static(path.join(__dirname, 'dist', appFolder)));

// Redirige todas las rutas a `index.html`
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', appFolder, 'index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Angular app is running on port ${PORT}`);
});
