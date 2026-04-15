const express = require('express');
const client = require('prom-client');

const app = express();

// Métricas por defecto (CPU, memoria, etc.)
client.collectDefaultMetrics();

// Contador de requests
const requestCounter = new client.Counter({
  name: 'app_requests_total',
  help: 'Total de requests',
});

// ❌ Contador de errores
const errorCounter = new client.Counter({
  name: 'app_errors_total',
  help: 'Total de errores en pagos',
});

// ⏱️ (BONUS) Tiempo de respuesta
const responseTime = new client.Histogram({
  name: 'app_response_time_seconds',
  help: 'Tiempo de respuesta en segundos',
});

// Endpoint de pago (SIMULACIÓN DE FALLO)
app.get('/pago', (req, res) => {
  const end = responseTime.startTimer(); // inicia medición

  requestCounter.inc();

  // Aumentamos a 50% para que sea más visible en demo
  if (Math.random() < 0.5) {
    errorCounter.inc();
    end();

    return res.status(500).json({
      version: "v2",
      status: "error",
      message: "Error en pago (simulado)"
    });
  }

  end();

  res.json({
    version: "v2",
    status: "ok",
    message: "Pago procesado correctamente (v2)"
  });
});

// Endpoint para Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Servidor
app.listen(3000, () => {
  console.log("🚀 App v2 corriendo con métricas y simulación de fallo");
});