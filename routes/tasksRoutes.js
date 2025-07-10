const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasksController.js');


router.get('/', controller.getAllTasks);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);
router.get('/summary', controller.getSummary);

module.exports = router;