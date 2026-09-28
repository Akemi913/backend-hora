const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Identificador único de la instancia (Task)
const HOSTNAME = os.hostname();

/**
 * GET /api/hora
 * Retorna la fecha y hora actual del servidor (incluyendo segundos)
 * junto con el identificador de la instancia que atendió la petición.
 */
app.get('/api/hora', (req, res) => {
  const now = new Date();

  // Formatear fecha en formato YYYY-MM-DD
  const fecha = now.toISOString().split('T')[0];

  // Formatear hora en formato HH:MM:SS
  const hora = now.toTimeString().split(' ')[0];

  res.json({
    fecha: fecha,
    hora: hora,
    instancia: HOSTNAME   // útil para el dashboard: identifica qué Task respondió
  });
});

// Endpoint de health check (usado por el ALB / Target Group)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en el puerto ${PORT} - Instancia: ${HOSTNAME}`);
});