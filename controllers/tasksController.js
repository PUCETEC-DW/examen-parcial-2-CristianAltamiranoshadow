const model = require('../models/tasksModel');

exports.getAllTasks = (req, res) => {
  res.json(model.getAll());
};

exports.createTask = (req, res) => {
  const { id, title, description, completed, priority } = req.body;

  if (!id || !title || !description || typeof completed !== 'boolean' || typeof priority !== 'number') {
    return res.status(400).json({ message: 'Datos incompletos o incorrectos por facor vuelva a ingresar' });
  }

  if (priority < 1 || priority > 5) {
    return res.status(400).json({ message: 'Priorioridad debe estar entre 1 y 5 (priority)' });
  }

  if (model.getById(id)) {
    return res.status(409).json({ message: 'ID duplicado no se aceptan vuelva ingresar uno nuevo' });
  }

  model.add({ id, title, description, completed, priority });
  res.status(201).json({ message: 'La Tarea ha sido  creada correctamente' });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'completedo debe ser booleano true o false no se aceta otro caracter' });
  }

  const success = model.update(id, { completed });
  if (success) {
    res.json({ message: 'La Tarea se actualizo satisfatoriamente' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada o no existe agregue una nueva tarea' });
  }
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const success = model.remove(id);

  if (success) {
    res.json({ message: 'La Tarea a sido eliminada de los registros' });
  } else {
    res.status(404).json({ message: 'La Tarea no ha sido encontrada en nuestros registros' });
  }
};

exports.getSummary = (req, res) => {
  const summary = model.getSummary();
  res.json(summary);
};
