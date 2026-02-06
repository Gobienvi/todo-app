const tasks = [
  {
    id: 1,
    completed: false,
    title: 'argue with the alarm clock',
    description: 'hit snooze at least 5 times and still be late',
    dueDate: '03/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
  {
    id: 2,
    completed: true,
    title: 'pretend to be productive',
    description: 'open laptop and stare at screen dramatically',
    dueDate: '07/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
  {
    id: 3,
    completed: false,
    title: 'look for lost sock',
    description: 'accept that it no longer exists',
    dueDate: '06/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
  {
    id: 4,
    completed: true,
    title: 'reward myself',
    description: 'drink beer because life is hard',
    dueDate: '04/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
];
// Global Variables

const taskForm = document.getElementById('taskForm');
const toDoList = document.getElementById('toDoList');
const completedList = document.getElementById('completedList');

// Event Listeners (triggers)

// to create a new task
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createNewTask();
});

[toDoList, completedList].forEach((list) => {
  list.addEventListener('click', (event) => {
    if (event.target.classList.contains('done')) {
      // Completes the task when 'Done' button is clicked
      const taskId = event.target.getAttribute('data-id');
      completeTask(taskId);
    } else if (event.target.classList.contains('notDone')) {
      // Marks the task as not completed when 'Not done' button is clicked
      const taskId = event.target.getAttribute('data-id');
      taskNotCompleted(taskId);
    } else if (event.target.classList.contains('delete')) {
      // Deletes the task when 'Delete' button is clicked
      const taskId = event.target.getAttribute('data-id');
      deleteTask(taskId);
    }
  });
});

// Functions

function displayTasks() {
  function formatTask(task) {
    const li = document.createElement('li');

    li.classList.add('card', 'p-3', 'shadow-sm', 'mt-2');
    const done = task.completed
      ? 'text-decoration-line-through opacity-50'
      : ''; // Class list if task is completed or not
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <h4 class="${done} col-11">${task.title}</h4>
        <button data-id="${task.id}" type="button" class="btn-close delete" aria-label="Close"></button>
      </div>
      <p class="${done}">${task.description}</p>
      <p class="${done}"><strong>Due: </strong>${task.dueDate}</p>
      <div class="d-flex justify-content-between align-items-end">
        <div>
          ${
            task.completed
              ? `<button data-id="${task.id}" class="btn btn-primary shadow-sm notDone" type="button">Not done</button>`
              : `
              <button data-id="${task.id}" class="btn btn-primary shadow-sm edit" type="button">Edit</button>
              <button data-id="${task.id}" class="btn btn-primary shadow-sm done" type="button">Done</button>
            `
          }
        </div>
        <p class="m-0 ${done}"><strong>Created on: </strong>${task.dateCreated}</p>
      </div>
    `;
    return li;
  }

  toDoList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task) => {
    const formattedTask = formatTask(task);
    task.completed
      ? completedList.appendChild(formattedTask)
      : toDoList.appendChild(formattedTask);
  });
  resetForm();
}

function createNewTask() {
  const taskDetails = {
    id: 5,
    title: taskForm.taskName.value.trim(),
    description: taskForm.taskDescription.value.trim(),
    dueDate: taskForm.dueDate.value,
    dateCreated: new Date(Date.now()).toLocaleDateString(),
    completed: false,
  };

  tasks.push(taskDetails);
  displayTasks();
}

function completeTask(taskId) {
  const task = tasks.find((task) => task.id == taskId);
  if (task) {
    task.completed = true;
  }
  displayTasks();
}

function taskNotCompleted(taskId) {
  const task = tasks.find((task) => task.id == taskId);
  if (task) {
    task.completed = false;
  }
  displayTasks();
}

function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id == taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
  displayTasks();
}
