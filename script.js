
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

//ФОРМА ЗАЯВКИ ТОВАРА

document.addEventListener('DOMContentLoaded', function () {
    let currentQuestionFirst = 1;
    const totalQuestionsFirst = 5;

    const questionsFirst = [
        { label: "Товар", placeholder: "Выберите товар" },
        { label: "Количество", placeholder: "Укажите количество товара" },
        { label: "Имя", placeholder: "Укажите свое имя" },
        { label: "Телефон", placeholder: "Введите ваш номер телефона" },
        { label: "Комментарий", placeholder: "Оставьте комментарий."}
    ];

    const progressElementFirst = document.getElementById('progress-first');
    const questionCounterFirst = document.getElementById('question-counter-first');
    const formLabelFirst = document.getElementById('form-label-first');
    const inputFieldFirst = document.getElementById('input-field-first');
    const nextButtonFirst = document.getElementById('next-btn-first');
    const prevButtonFirst = document.getElementById('prev-btn-first');
    const auditFormFirst = document.getElementById('audit-form-first');
    const successMessageFirst = document.getElementById('success-message-first');
    const errorMessageFirst = document.getElementById('error-message-first');

    const answersFirst = new Array(totalQuestionsFirst).fill('');

    // Ваш токен и ID чата в Telegram
    const telegramToken = '7565359008:AAG-mPWEY8luvPOldIehVgE7QTHru4yDI10';
    const chatId = '6388010174';

    function updateFormFirst() {
        const progressPercentFirst = (currentQuestionFirst / totalQuestionsFirst) * 100;
        progressElementFirst.style.width = `${progressPercentFirst}%`;
        questionCounterFirst.textContent = `Вопрос ${currentQuestionFirst} / ${totalQuestionsFirst}`;

        formLabelFirst.textContent = questionsFirst[currentQuestionFirst - 1].label;
        inputFieldFirst.placeholder = questionsFirst[currentQuestionFirst - 1].placeholder;
        inputFieldFirst.type = "text";
        inputFieldFirst.value = answersFirst[currentQuestionFirst - 1] || '';
        errorMessageFirst.style.display = 'none';
        prevButtonFirst.style.display = currentQuestionFirst > 1 ? 'inline-block' : 'none';
    }

    function sendMessageToTelegramFirst() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentDate = `${day}.${month}.${year}`;
        const currentTime = `${hours}:${minutes}`;

        const message = `❗️Заявка по товару. Дата создания: ${currentDate}\n` +
                        `Время создания: ${currentTime}\n\n` +
                        `Товар: ${answersFirst[0]}\n` +
                        `Количество: ${answersFirst[1]}\n` +
                        `Имя: ${answersFirst[2]}\n` +
                        `Телефон: ${answersFirst[3]}\n` +
                        `Комментарий: ${answersFirst[4]}`;

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

    function goToNextQuestionFirst() {
        answersFirst[currentQuestionFirst - 1] = inputFieldFirst.value.trim();

        if (inputFieldFirst.value.trim() === '') {
            errorMessageFirst.textContent = 'Пожалуйста, заполните поле перед переходом к следующему вопросу.';
            errorMessageFirst.style.display = 'block';
            return;
        }

        if (currentQuestionFirst === totalQuestionsFirst) {
            auditFormFirst.style.display = 'none';
            questionCounterFirst.style.display = 'none';
            successMessageFirst.style.display = 'block';

            sendMessageToTelegramFirst();
        } else {
            currentQuestionFirst++;
            updateFormFirst();
        }
    }

    nextButtonFirst.addEventListener('click', goToNextQuestionFirst);
    prevButtonFirst.addEventListener('click', function () {
        answersFirst[currentQuestionFirst - 1] = inputFieldFirst.value.trim();
        if (currentQuestionFirst > 1) {
            currentQuestionFirst--;
            updateFormFirst();
        }
    });

    inputFieldFirst.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToNextQuestionFirst();
        }
    });

    updateFormFirst();
});

//ФОРМА ЗАЯВКИ СОТРУДНИЧЕСТВА

document.addEventListener('DOMContentLoaded', function () {
    let currentQuestionSecond = 1;
    const totalQuestionsSecond = 5;

    const questionsSecond = [
        { label: "Наименование компании", placeholder: "Введите наименование компании" },
        { label: "Поставщик или дистрибьютор", placeholder: "Выберите поставщик или дистрибьютор" },
        { label: "Имя", placeholder: "Введите ваше имя" },
        { label: "Телефон", placeholder: "Введите ваш номер телефона" },
        { label: "Комментарий", placeholder: "Оставьте комментарий" }
    ];

    const progressElementSecond = document.getElementById('progress-second');
    const questionCounterSecond = document.getElementById('question-counter-second');
    const formLabelSecond = document.getElementById('form-label-second');
    const inputFieldSecond = document.getElementById('input-field-second');
    const nextButtonSecond = document.getElementById('next-btn-second');
    const prevButtonSecond = document.getElementById('prev-btn-second');
    const auditFormSecond = document.getElementById('audit-form-second');
    const successMessageSecond = document.getElementById('success-message-second');
    const errorMessageSecond = document.getElementById('error-message-second');

    const answersSecond = new Array(totalQuestionsSecond).fill('');

    // Ваш токен и ID чата в Telegram
    const telegramToken = '7565359008:AAG-mPWEY8luvPOldIehVgE7QTHru4yDI10';
    const chatId = '6388010174';

    function updateFormSecond() {
        const progressPercentSecond = (currentQuestionSecond / totalQuestionsSecond) * 100;
        progressElementSecond.style.width = `${progressPercentSecond}%`;
        questionCounterSecond.textContent = `Вопрос ${currentQuestionSecond} / ${totalQuestionsSecond}`;

        formLabelSecond.textContent = questionsSecond[currentQuestionSecond - 1].label;
        inputFieldSecond.placeholder = questionsSecond[currentQuestionSecond - 1].placeholder;
        inputFieldSecond.type = "text";
        inputFieldSecond.value = answersSecond[currentQuestionSecond - 1] || '';
        errorMessageSecond.style.display = 'none';
        prevButtonSecond.style.display = currentQuestionSecond > 1 ? 'inline-block' : 'none';
    }

    function sendMessageToTelegramSecond() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentDate = `${day}.${month}.${year}`;
        const currentTime = `${hours}:${minutes}`;

        const message = `🤝 Заявка по сотрудничеству. Дата создания: ${currentDate}\n` +
                        `Время создания: ${currentTime}\n\n` +
                        `Наименование компании: ${answersSecond[0]}\n` +
                        `Поставщик или дистрибьютор: ${answersSecond[1]}\n` +
                        `Имя: ${answersSecond[2]}\n` +
                        `Телефон: ${answersSecond[3]}\n` +
                        `Комментарий: ${answersSecond[4]}`;

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

    function goToNextQuestionSecond() {
        answersSecond[currentQuestionSecond - 1] = inputFieldSecond.value.trim();

        if (inputFieldSecond.value.trim() === '') {
            errorMessageSecond.textContent = 'Пожалуйста, заполните поле перед переходом к следующему вопросу.';
            errorMessageSecond.style.display = 'block';
            return;
        }

        if (currentQuestionSecond === totalQuestionsSecond) {
            auditFormSecond.style.display = 'none';
            questionCounterSecond.style.display = 'none';
            successMessageSecond.style.display = 'block';

            sendMessageToTelegramSecond();
        } else {
            currentQuestionSecond++;
            updateFormSecond();
        }
    }

    nextButtonSecond.addEventListener('click', goToNextQuestionSecond);
    prevButtonSecond.addEventListener('click', function () {
        answersSecond[currentQuestionSecond - 1] = inputFieldSecond.value.trim();
        if (currentQuestionSecond > 1) {
            currentQuestionSecond--;
            updateFormSecond();
        }
    });

    inputFieldSecond.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToNextQuestionSecond();
        }
    });

    updateFormSecond();
});
