document.addEventListener('DOMContentLoaded', function() {
  try {
    const tg = window.Telegram.WebApp;
    tg.ready(); // Сообщаем Telegram, что приложение готово

    const statusText = document.getElementById('status-text');

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      statusText.textContent = "Добро пожаловать, " + tg.initDataUnsafe.user.first_name + "!";
    } else {
      statusText.textContent = "Добро пожаловать!";
    }

    setTimeout(() => {
      statusText.textContent = "Ваш KINRA Core инициализирован.";
    }, 2000);

  } catch (e) {
    const statusText = document.getElementById('status-text');
    statusText.textContent = "Ошибка: Запустите в Telegram.";
    console.error(e);
  }
});