// Помещаем за пределы обработчика, чтобы переменные были доступны везде
const SUPABASE_URL = 'https://iujopqhajvardqtlbntc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1am9wcWhhanZhcmRxdGxibnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMzM3NjgsImV4cCI6MjA2OTYwOTc2OH0.eDsatkqWeoZyWJQCzpUf7JAbOc5L0eJ9vnfATKyeMFA';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function() {
  try {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const statusText = document.getElementById('status-text');

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      statusText.textContent = "Добро пожаловать, " + tg.initDataUnsafe.user.first_name + "!";
    } else {
      statusText.textContent = "Добро пожаловать!";
    }

    setTimeout(() => {
      statusText.textContent = "Ваш KINRA Core инициализирован.";
      fetchAndDisplayTasks();
    }, 2000);

  } catch (e) {
    const statusText = document.getElementById('status-text');
    statusText.textContent = "Ошибка: Запустите в Telegram.";
    console.error(e);
  }
});

async function fetchAndDisplayTasks() {
  const taskListContainer = document.getElementById('task-list');
  taskListContainer.innerHTML = '<p>Загрузка заданий...</p>';

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Ошибка при чтении из Supabase:", error);
    taskListContainer.innerHTML = `<p>Не удалось загрузить задания. Ошибка: ${error.message}</p>`;
    return;
  }

  if (tasks.length === 0) {
    taskListContainer.innerHTML = '<p>Новых заданий пока нет.</p>';
    return;
  }

  taskListContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);

    taskListContainer.appendChild(taskItem);
  });
}