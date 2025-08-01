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
      displayTasks(); // Вызываем функцию отображения заданий
    }, 2000);

  } catch (e) {
    const statusText = document.getElementById('status-text');
    statusText.textContent = "Ошибка: Запустите в Telegram.";
    console.error(e);
  }
});

// Функция для отображения заданий
function displayTasks() {
  const taskListContainer = document.getElementById('ta');

  // Тестовые (фейковые) данные
  const tasks = [
    {
      title: "Подписка на Канал",
      description: "Награда: 0.1 поинт. Подпишитесь на канал нашего партнера."
    },
    {
      title: "Тест Web3 Игры",
      description: "Награда: 1.5 поинта. Установите игру и достигните 5 уровня."
    },
    {
      title: "Оставить Отзыв",
      description: "Награда: 0.5 поинта. Напишите честный отзыв о новом DEX."
    }
  ];

  // Очищаем контейнер перед добавлением новых элементов
  taskListContainer.innerHTML = '';

  // Создаем и добавляем элементы заданий на страницу
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