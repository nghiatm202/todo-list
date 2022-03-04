const taskInput = document.querySelector('.task-input input')
const taskBox = document.querySelector('.task-box')

let todoList = JSON.parse(localStorage.getItem('todo-list')) // convert JSON -> JavaScript types

taskInput.addEventListener('keyup', function (e) {
  let newTask = taskInput.value.trim()

  if (e.key === 'Enter' && newTask) {
    if (!todoList) {
      todoList = []
    }

    taskInput.value = ''

    let taskInfo = {
      name: newTask,
      status: 'pending',
    }

    todoList.push(taskInfo)
    console.log(todoList)
    localStorage.setItem('todo-list', JSON.stringify(todoList)) // convert JavaScript types -> JSON
    render()
  }
})

function render() {
  let li = ''
  if (todoList) {
    todoList.forEach((todo, index) => {
      let isCompleted = todo.status == 'completed' ? 'checked' : ' '
      li += `<li class="task">
          <label for="${index}">
            <input type="checkbox" onclick="updateStatus(this)" id="${index}" ${isCompleted} />
            <p class="${isCompleted}">${todo.name}</p>
          </label>

          <div class="settings">
            <i class="bx bx-dots-horizontal-rounded"></i>

            <ul class="task-menu">
              <li><i class="bx bx-pencil"></i>Edit</li>
              <li><i class="bx bx-trash-alt"></i>Delete</li>
            </ul>
          </div>
        </li>`
    })
  }
  taskBox.innerHTML = li
}
render()

function updateStatus(e) {
  let taskName = e.parentElement.lastElementChild
  if (e.checked) {
    taskName.classList.add('checked')
    todoList[e.id].status = 'completed'
  } else {
    taskName.classList.remove('checked')
    todoList[e.id].status = 'pending'
  }
  localStorage.setItem('todo-list', JSON.stringify(todoList))
}
