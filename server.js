const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir las carpetas estáticas
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/src/email', express.static(path.join(__dirname, 'src', 'email')));

// Ruta principal para el index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
