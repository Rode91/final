const express = require('express');
const app = express();

app.get('/pago', (req, res) => {
  res.json({
    version: "v1",
    status: "ok",
    message: "Pago procesado correctamente"
  });
});

app.get('/health', (req, res) => {
  res.send("OK");
});

app.listen(3000, () => {
  console.log("App v1 corriendo en puerto 3000");
});