const express = require('express');
const client = require('prom-client');

const app = express();

// Métricas
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const requestCounter = new client.Counter({
  name: 'app_requests_total',
  help: 'Total de requests',
});

const errorCounter = new client.Counter({
  name: 'app_errors_total',
  help: 'Total de errores en pagos',
});

app.get('/pago', (req, res) => {
  requestCounter.inc();

  if (Math.random() < 0.3) {
    errorCounter.inc();
    return res.status(500).json({
      version: "v2",
      status: "error",
      message: "Error en pago"
    });
  }

  res.json({
    version: "v2",
    status: "ok",
    message: "Pago procesado con nueva lógica"
  });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => {
  console.log("App v2 corriendo con métricas");
});