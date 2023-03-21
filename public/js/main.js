import { refreshBtn,
  resetBtn,
  submitBtn,
  taskInput,
  listTask
} from './config.js';

import { addTaskToTable } from './addTaskToTable.js'

// helper functions
const reset = () => {
  taskInput.value = "";
}
const validate = () => taskInput.value !== "";

// listners
refreshBtn.addEventListener('click', async () => {
  const request = await fetch('/refresh');
  if (request.ok) {
    listTask.innerHTML = "";

    return
  }

  alert('Server problem');
});
resetBtn.addEventListener('click', reset);
submitBtn.addEventListener('click', async () => {
  if (!validate()) return alert('check input');

  const request = await fetch('tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: taskInput.value
    })
  });

  const response = await request.json();
  const task = response;
  
  addTaskToTable(listTask, task);
  reset();
});

// entry point
async function main(table) {
  table.innerHTML = "";
  const request = await fetch('/tasks');
  const tasks = await request.json();

  tasks.forEach(task => {
    addTaskToTable(table, task);
  });
};

main(listTask);
