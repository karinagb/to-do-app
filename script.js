const form = document.querySelector('.add-task');
const to_do_list = document.querySelector('.to-do-list');
const tasks = [];

function addNewTask(e) {
  e.preventDefault();

  const task = this.querySelector('[name=new-task]').value;
  tasks.push(task);
  populateList(tasks, to_do_list);
  this.reset();
}

function populateList(tasks, to_do_list){
    to_do_list.innerHTML = tasks
    .map((task)=>{
        return `<li>${task}</li>`
    })
    .join('')
}

form.addEventListener('submit', addNewTask);
