const API = 'http://localhost:8080/api/todos';
let currentFilter = 'all';

// set today's date in header
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now = new Date();
document.getElementById('dateLabel').textContent =
  days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();

// READ
async function loadTodos() {
  const res   = await fetch(API);
  const todos = await res.json();

  const filtered =
    currentFilter === 'done'    ? todos.filter(t => t.completed) :
    currentFilter === 'pending' ? todos.filter(t => !t.completed) :
    todos;

  const list = document.getElementById('todoList');

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <span>📋</span>
        No todos here yet!
      </div>`;
  } else {
    list.innerHTML = filtered.map(t => `
      <li class="todo-item ${t.completed ? 'done' : ''}" id="item-${t.id}">
        <button class="check-btn ${t.completed ? 'checked' : ''}"
                onclick="toggleDone(${t.id}, ${t.completed})">
          ${t.completed
            ? `<svg viewBox="0 0 12 12" fill="none">
                <polyline points="2,6 5,9 10,3"
                  stroke="white" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
               </svg>`
            : ''}
        </button>
        <div class="todo-content">
          <div class="todo-title">${t.title}</div>
          ${t.description
            ? `<div class="todo-desc">${t.description}</div>`
            : ''}
        </div>
        <div class="todo-actions">
          <button class="del-btn" onclick="deleteTodo(${t.id})">
            <svg viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12"/>
              <line x1="12" y1="2" x2="2" y2="12"/>
            </svg>
          </button>
        </div>
      </li>`).join('');
  }

  // update stats
  document.getElementById('totalCount').textContent = todos.length;
  document.getElementById('doneCount').textContent  = todos.filter(t => t.completed).length;
  document.getElementById('pendCount').textContent  = todos.filter(t => !t.completed).length;
}

// CREATE
async function createTodo() {
  const titleInput = document.getElementById('titleInput');
  const descInput  = document.getElementById('descInput');
  const title = titleInput.value.trim();
  const desc  = descInput.value.trim();

  if (!title) {
    titleInput.style.borderColor = '#e74c3c';
    titleInput.focus();
    setTimeout(() => titleInput.style.borderColor = '#efefef', 1500);
    return;
  }

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, description: desc, completed: false })
  });

  if (res.ok) {
    titleInput.value = '';
    descInput.value  = '';
    loadTodos();
  } else {
    alert('Error adding todo. Check the backend is running.');
  }
}

// UPDATE (toggle complete)
async function toggleDone(id, currentStatus) {
  const res  = await fetch(`${API}/${id}`);
  const todo = await res.json();
  todo.completed = !currentStatus;
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  loadTodos();
}

// DELETE
async function deleteTodo(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTodos();
}

// FILTER
function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  loadTodos();
}

loadTodos();