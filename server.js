const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Define el puerto dinámico para el entorno de producción o un valor por defecto (8000)
const PORT = process.env.PORT || 8000;

// Ruta absoluta al archivo index.html (cambia esta ruta según la ubicación actual de tu index.html)
const indexPath = path.join(__dirname, 'index.html');

// Verifica si el archivo index.html existe
if (!fs.existsSync(indexPath)) {
  console.error(`Error: No se encontró index.html en la ruta: ${indexPath}`);
  process.exit(1); // Termina el proceso si no encuentra el archivo
}

// Sirve el archivo index.html para todas las rutas
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


