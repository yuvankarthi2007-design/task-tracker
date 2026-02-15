let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editId = null;

const titleInput = document.getElementById("title");
const dateInput = document.getElementById("dueDate");
const statusInput = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");
const taskList = document.getElementById("taskList");

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.dueDate}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="editTask('${task.id}')">Edit</button>
        <button onclick="deleteTask('${task.id}')">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

submitBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const dueDate = dateInput.value;
  const status = statusInput.value;

  if (!title || !dueDate) {
    alert("All fields are required");
    return;
  }

  if (editId) {
    // UPDATE
    const task = tasks.find(t => t.id === editId);
    task.title = title;
    task.dueDate = dueDate;
    task.status = status;

    editId = null;
    submitBtn.textContent = "Add Task";
  } else {
    // CREATE
    tasks.push({
      id: Date.now().toString(),
      title,
      dueDate,
      status
    });
  }

  saveData();
  renderTasks();
  clearForm();
});

function editTask(id) {
  const task = tasks.find(t => t.id === id);

  titleInput.value = task.title;
  dateInput.value = task.dueDate;
  statusInput.value = task.status;

  editId = id;
  submitBtn.textContent = "Update Task";
}

function deleteTask(id) {
  if (!confirm("Delete this task?")) return;

  tasks = tasks.filter(t => t.id !== id);
  saveData();
  renderTasks();
}

function clearForm() {
  titleInput.value = "";
  dateInput.value = "";
  statusInput.value = "Pending";
}

renderTasks();
