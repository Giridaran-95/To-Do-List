const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = taskText;

  const btns = document.createElement("div");
  btns.className = "task-buttons";

  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = "✅";
  doneBtn.onclick = () => {
    li.classList.toggle("completed");
  };

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "🗑️";
  delBtn.onclick = () => {
    taskList.removeChild(li);
  };

  btns.appendChild(doneBtn);
  btns.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(btns);
  taskList.appendChild(li);

  input.value = "";
}
