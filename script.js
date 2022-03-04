const taskInput = document.querySelector('.task-input input')
const taskBox = document.querySelector('.task-box')
const filters = document.querySelectorAll('.filters span')
const clearAll = document.querySelector('.clear-btn')

let editId
let isEditedTask = false
let todoList = JSON.parse(localStorage.getItem('todo-list')) // convert JSON -> JavaScript types

filters.forEach((element) => {
  element.addEventListener('click', function () {
    document.querySelector('span.active').classList.remove('active')
    element.classList.add('active')
    render(element.id) // chú ý
  })
})

taskInput.addEventListener('keyup', function (e) {
  let newTask = taskInput.value.trim()

  if (e.key === 'Enter' && newTask) {
    if (!isEditedTask) {
      if (!todoList) {
        todoList = []
      }

      let taskInfo = {
        name: newTask,
        status: 'pending',
      }

      todoList.push(taskInfo)
    } else {
      isEditedTask = false
      todoList[editId].name = newTask
    }

    taskInput.value = ''
    localStorage.setItem('todo-list', JSON.stringify(todoList)) // convert JavaScript types -> JSON
    render('all')
    scrollToActiveTask()
  }
})

clearAll.addEventListener('click', function () {
  todoList.splice(0, todoList.length)
  localStorage.setItem('todo-list', JSON.stringify(todoList))
  render('all')
})

function render(filter) {
  let li = ''
  if (todoList) {
    todoList.forEach((todo, index) => {
      let isCompleted = todo.status == 'completed' ? 'checked' : ' '
      if (filter === todo.status || filter === 'all') {
        li += `<li class="task">
          <label for="${index}">
            <input type="checkbox" onclick="updateStatus(this)" id="${index}" ${isCompleted} />
            <p class="${isCompleted}">${todo.name}</p>
          </label>

          <div class="settings">
            <i onclick="showMenu(this)" class="bx bx-dots-horizontal-rounded"></i>

            <ul class="task-menu">
              <li onclick="editTask(${index}, '${todo.name}')"><i class="bx bx-pencil"></i>Edit</li>
              <li onclick="deleteTask(${index})"><i class="bx bx-trash-alt"></i>Delete</li>
            </ul>
          </div>
        </li>`
      }
    })
  }

  taskBox.innerHTML = li || `<span>You don't have any task here!</span>`
}
render('all')

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

function showMenu(element) {
  let taskMenu = element.parentElement.lastElementChild
  taskMenu.classList.add('show')
  document.addEventListener('click', function (e) {
    if (e.target !== element) {
      taskMenu.classList.remove('show')
    }
  })
}

function deleteTask(index) {
  todoList.splice(index, 1)
  localStorage.setItem('todo-list', JSON.stringify(todoList))
  render('all')
}

function editTask(index, taskName) {
  editId = index
  isEditedTask = true
  taskInput.value = taskName
}

function scrollToActiveTask() {
  setTimeout(() => {
    document.querySelector('.task-box').scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, 300)
}