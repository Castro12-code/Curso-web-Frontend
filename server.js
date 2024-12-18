const express = require('express');
const path = require('path');

const app = express();

// Define el puerto dinámico para el entorno de producción o un valor por defecto (8000)
const PORT = process.env.PORT || 8000;

// Ruta al archivo src/index.html
const indexPath = path.join(__dirname, 'src', 'index.html');

// Verifica si el archivo index.html existe
if (!require('fs').existsSync(indexPath)) {
  console.error(`Error: No se encontró index.html en la ruta: ${indexPath}`);
  process.exit(1); // Termina el proceso si no encuentra el archivo
}

// Sirve el archivo src/index.html para todas las rutas
app.get('*', (req, res) => {
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

