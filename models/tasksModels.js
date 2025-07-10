let tasks = [];

module.exports = {
  getAll: () => tasks,

  getById: (id) => tasks.find(t => t.id === id),

  add: (task) => {
    tasks.push(task);
  },

  update: (id, updates) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      return true;
    }
    return false;
  },

  remove: (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    return tasks.length < initialLength;
  },

  getSummary: () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed);
    const avgPriority = pending.length > 0
      ? pending.reduce((acc, t) => acc + t.priority, 0) / pending.length
      : 0;

    return {
      total,
      completed,
      averagePriority: avgPriority.toFixed(2)
    };
  }
};