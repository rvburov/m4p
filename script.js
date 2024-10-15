let currentIndex = 0;
    const items = document.querySelectorAll('.catalog-container');
    const totalItems = items.length;

    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalItems; // Переход к следующему элементу
        items[currentIndex].classList.add('active');
    }
    setInterval(showNextItem, 3000); // Интервал переключения (3000 мс = 3 секунды)


//НАВИГАТОР ПРОГРУТКА СТРАНИЦЫ

window.addEventListener("scroll", function() {
    var navigation = document.querySelector(".container-navigation");
    
    // Если прокрутка больше 50px, добавляем класс 'scrolled'
    if (window.scrollY > 50) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});

//ФОРМА ЗАЯВКИ

document.addEventListener('DOMContentLoaded', function () {
    let currentQuestion = 1;
    const totalQuestions = 5;

    const questions = [
        { label: "Товар", placeholder: "Выберите товар" },
        { label: "Количество", placeholder: "Укажите количество товара" },
        { label: "Имя", placeholder: "Укажите свое имя" },
        { label: "Телефон", placeholder: "Введите ваш номер телефона" },
        { label: "Комментарий", placeholder: "Оставьте комментарий."}
    ];

    const progressElement = document.getElementById('progress');
    const questionCounter = document.getElementById('question-counter');
    const formLabel = document.getElementById('form-label');
    const inputField = document.getElementById('input-field');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const auditForm = document.getElementById('audit-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Массив для хранения ответов на каждый вопрос
    const answers = new Array(totalQuestions).fill('');

    // Ваш токен и ID чата в Telegram
    const telegramToken = '7565359008:AAG-mPWEY8luvPOldIehVgE7QTHru4yDI10';
    const chatId = '6388010174';

    // Функция получения текущей даты и времени в формате дд.мм.гггг и чч:мм
    function getCurrentDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    function updateForm() {
        const progressPercent = (currentQuestion / totalQuestions) * 100;
        progressElement.style.width = `${progressPercent}%`;
        questionCounter.textContent = `Вопрос ${currentQuestion} / ${totalQuestions}`;

        // Обновляем поле формы
        formLabel.textContent = questions[currentQuestion - 1].label;
        inputField.placeholder = questions[currentQuestion - 1].placeholder;

        // Если вопрос включает файл
        if (questions[currentQuestion - 1].type === "file") {
            inputField.type = "file";
        } else {
            inputField.type = "text";
        }

        // Восстанавливаем введенные данные для текущего вопроса
        inputField.value = answers[currentQuestion - 1] || '';

        // Скрываем сообщение об ошибке при переходе к новому вопросу
        errorMessage.style.display = 'none';

        // Показываем или скрываем кнопку "Назад" в зависимости от текущего вопроса
        prevButton.style.display = currentQuestion > 1 ? 'inline-block' : 'none';
    }

    function sendMessageToTelegram(message) {
        const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent to Telegram:', data);
        })
        .catch(error => {
            console.error('Error sending message to Telegram:', error);
        });
    }

    function goToNextQuestion() {
        // Сохраняем введенное значение в массив ответов
        answers[currentQuestion - 1] = inputField.value.trim();

        // Проверяем, что поле заполнено, если оно не является файлом или необязательным полем
        if (questions[currentQuestion - 1].type !== "file" && inputField.value.trim() === '') {
            errorMessage.textContent = 'Пожалуйста, заполните поле перед переходом к следующему вопросу.';
            errorMessage.style.display = 'block';
            return;
        }

        // Если это последний вопрос, показать сообщение об успешной отправке и отправить данные в Telegram
        if (currentQuestion === totalQuestions) {
            auditForm.style.display = 'none'; // Скрыть форму
            questionCounter.style.display = 'none'; // Скрыть счетчик вопросов
            successMessage.style.display = 'block'; // Показать сообщение "Заявка отправлена"

            // Формируем сообщение для отправки в Telegram
            const currentDateTime = getCurrentDateTime();
            const message = `Заявка. Дата создания: ${currentDateTime.split(' ')[0]}\n` +
                            `Время создания: ${currentDateTime.split(' ')[1]}\n\n` +
                            `Товар: ${answers[0]}\n` +
                            `Количество: ${answers[1]}\n` +
                            `Имя: ${answers[2]}\n` +
                            `Телефон: ${answers[3]}\n` +
                            `Комментарий: ${answers[4]}`;

            sendMessageToTelegram(message);

        } else {
            currentQuestion++;
            updateForm();
        }
    }

    nextButton.addEventListener('click', goToNextQuestion);

    prevButton.addEventListener('click', function () {
        // Сохраняем введенное значение перед переходом на предыдущий вопрос
        answers[currentQuestion - 1] = inputField.value.trim();

        if (currentQuestion > 1) {
            currentQuestion--;
            updateForm();
        }
    });

    // Добавляем прослушивание события "keydown" на поле ввода
    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Чтобы форма не отправлялась по умолчанию
            goToNextQuestion(); // Переход на следующий вопрос
        }
    });

    // Инициализация формы
    updateForm();
});
