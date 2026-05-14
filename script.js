const form = document.querySelector('.add-task');

const lists = document.querySelectorAll('.list');
const to_do_list = document.querySelector('.to-do-list');
const doing_list = document.querySelector('.doing-list');
const done_list = document.querySelector('.done-list');
const tasks = JSON.parse(localStorage.getItem('items')) || [];

let task;

renderAllLists();

function addNewTask(e) {
  e.preventDefault();

  const text = this.querySelector('[name=new-task]').value;
  const newTask = {
    text,
    doing: false,
    done: false,
  };
  tasks.push(newTask);
  renderAllLists();
  this.reset();
}

function populateList(tasks, list) {
  list.innerHTML = tasks
    .map((task) => {
      return `<li draggable="true">${task.text}</li>`;
    })
    .join('');
}

function updateList(e) {
  e.preventDefault();

  if (task.doing === false && task.done === false) {
    task.doing = true;
  } else if (task.doing === true && task.done === false) {
    task.done = true;
  }

  renderAllLists();
}

function renderAllLists() {
  populateList(
    tasks.filter((task) => !task.doing && !task.done),
    to_do_list,
  );
  populateList(
    tasks.filter((task) => task.doing && !task.done),
    doing_list,
  );
  populateList(
    tasks.filter((task) => task.done),
    done_list,
  );
  localStorage.setItem('items', JSON.stringify(tasks));
}

form.addEventListener('submit', addNewTask);

document.addEventListener('dragstart', (e) => {
  const text = e.target.textContent;
  task = tasks.find((task) => task.text === text);
});

lists.forEach((list) => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  list.addEventListener('drop', updateList);
});
