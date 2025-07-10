const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasksRoutes').default;

app.use(express.json());
app.use('/tasks', tasksRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`pro bando Servidor corriendo en el puerto  http://localhost:${PORT}`);
});