let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

const txt = document.getElementById('text'),
      due = document.getElementById('dueDate'),
      prio = document.getElementById('priority'),
      addBtn = document.getElementById('addBtn'),
      filter = document.getElementById('filter'),
      taskList = document.getElementById('taskList'),
      tpl = document.getElementById('taskTpl').content;

addBtn.onclick = () => {
  if(!txt.value || !due.value) return alert('Fill all fields!');
  tasks.push({id: Date.now(), desc: txt.value, due: due.value, prio: prio.value, done:false});
  saveAndRender();
  [txt.value, due.value] = ['', ''];
};

filter.onchange = renderTasks;

function saveAndRender(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks(){
  taskList.innerHTML = '';
  const flt = filter.value;
  tasks.filter(t =>
    flt==='all' ||
    (flt==='completed'&&t.done) ||
    (flt==='pending'&&!t.done)
  ).forEach(task => {
    const el = document.importNode(tpl, true);
    const li = el.querySelector('li');
    el.querySelector('.desc').textContent = task.desc;
    el.querySelector('.due').textContent = task.due;
    const pspan = el.querySelector('.priority');
    pspan.textContent = task.prio;
    pspan.classList.add(task.prio.toLowerCase());
    const chk = el.querySelector('.completeChk');
    chk.checked = task.done;
    if(task.done) el.querySelector('.desc').style.textDecoration = 'line-through';

    chk.onchange = () => { task.done = chk.checked; saveAndRender(); };
    el.querySelector('.deleteBtn').onclick = () => {
      li.classList.add('fade-out');
      li.addEventListener('animationend', ()=>{
        tasks = tasks.filter(t=>t.id!==task.id);
        saveAndRender();
      });
    };

    el.querySelector('.editBtn').onclick = () => {
      const newDesc = prompt("Edit description:",task.desc);
      const newDue = prompt("Edit due date (YYYY‑MM‑DD):",task.due);
      const newPrio = prompt("Priority (Low/Medium/High):",task.prio);
      if(newDesc && newDue && newPrio){
        task.desc=newDesc; task.due=newDue; task.prio=newPrio;
        saveAndRender();
      }
    };

    taskList.appendChild(el);
  });
}

// Initial render
renderTasks();
