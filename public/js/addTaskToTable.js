import { listTask } from "./config.js";

export const addTaskToTable = (table, task) => {
  const row = document.createElement('tr');
  const contentCell = document.createElement('td');
  const deleteCell = document.createElement('td');
  const arrowsCell = document.createElement('td');

  const topButton = document.createElement('button');
  topButton.id = "top";
  topButton.innerText = "top";
  topButton.addEventListener('click', async () => {
    row.previousElementSibling.before(row);
    // send a request to server with change the order => switch tasks
  });

  const buttomButton = document.createElement('button');
  buttomButton.id = "buttom";
  buttomButton.innerText = "buttom";
  buttomButton.addEventListener('click', async () => {
    row.nextElementSibling.after(row);
    // send a request to server with change the order => switch tasks
  });


  contentCell.innerText = task.content;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener('click', async () => {
    const req = await fetch('tasks/' + task.id, { method: 'DELETE' });
    if (req.ok) {
      row.remove();
    }
  });

  deleteCell.append(deleteBtn);
  arrowsCell.append(...[topButton, buttomButton]);

  row.setAttribute('id', task.id);
  row.setAttribute('order', task.order);
  row.append(...[contentCell, deleteCell, arrowsCell]);
  listTask.append(row);
}