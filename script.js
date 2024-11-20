// ПЕРЕКЛЮЧЕНИЕ ИЗОБРАЖЕНИИ НА ГЛАВНОЙ СТРАНИЦЫ
document.addEventListener("DOMContentLoaded", function () {
    // Скрываем все блоки перед инициализацией
    const items = document.querySelectorAll('.catalog-container');
    let currentIndex = 0;
    const totalItems = items.length;

    // Показываем только первый элемент при загрузке страницы
    items.forEach((item) => item.classList.remove('active'));
    items[currentIndex].classList.add('active');

    // Функция для переключения на следующий элемент
    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalItems; // Переход к следующему элементу
        items[currentIndex].classList.add('active');
    }

    // Запускаем интервал переключения
    setInterval(showNextItem, 3000); // Интервал 3 секунды
});

// НАВИГАТОР ПРОГРУТКА СТРАНИЦЫ

window.addEventListener("scroll", function() {
    var navigation = document.querySelector(".container-navigation");
    var adaptivNavigation = document.querySelector(".container-navigation-adaptiv-open");
    
    // Если прокрутка больше 50px, добавляем класс 'scrolled'
    if (window.scrollY > 10) {
        navigation.classList.add("scrolled");
        adaptivNavigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
        adaptivNavigation.classList.remove("scrolled");
    }
});

// ФОРМА ЗАЯВКИ ТОВАРА

document.addEventListener('DOMContentLoaded', function () {
    let currentQuestionFirst = 1;
    const totalQuestionsFirst = 5;

    const questionsFirst = [
        { label: "Товар", placeholder: "Укажите товар" },
        { label: "Количество", placeholder: "Укажите количество товара" },
        { label: "Имя", placeholder: "Укажите свое имя" },
        { label: "Телефон", placeholder: "Введите ваш номер телефона" },
        { label: "Комментарий", placeholder: "Оставьте комментарий"}
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
    const chatId = ['6388010174', '809882910'];

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

        chatId.forEach(id => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: id,
                    text: message,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log(`Сообщение успешно отправлено в чат ${id}`);
                } else {
                    console.error(`Ошибка отправки сообщения в чат ${id}:`, data);
                }
            })
            .catch(error => {
                console.error(`Ошибка подключения для чата ${id}:`, error);
            });
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

// ФОРМА ЗАЯВКИ СОТРУДНИЧЕСТВА

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
    const chatId = ['6388010174', '809882910'];

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

        chatId.forEach(id => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: id,
                    text: message,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log(`Сообщение успешно отправлено в чат ${id}`);
                } else {
                    console.error(`Ошибка отправки сообщения в чат ${id}:`, data);
                }
            })
            .catch(error => {
                console.error(`Ошибка подключения для чата ${id}:`, error);
            });
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

// ОТКРЫТИЕ И ЗАКРЫТИЕ МЕНЮ

// Находим элементы открытого и закрытого меню
const openMenuButton = document.querySelector('.navigation-open-menu-adaptiv-open');
const closeMenuButton = document.querySelector('.navigation-close-menu-adaptiv-close');
const adaptivOpenMenu = document.querySelector('.container-navigation-adaptiv-open');
const adaptivCloseMenu = document.querySelector('.container-navigation-adaptiv-close');

// Функция открытия меню
openMenuButton.addEventListener('click', () => {
    adaptivOpenMenu.style.display = 'none'; // Скрыть значок открытия меню
    adaptivCloseMenu.style.display = 'flex'; // Показать закрытое меню
});

// Функция закрытия меню
closeMenuButton.addEventListener('click', () => {
    adaptivOpenMenu.style.display = 'flex'; // Показать значок открытия меню
    adaptivCloseMenu.style.display = 'none'; // Скрыть закрытое меню
});

// ФУНКЦИЯ СКАЧИВАНИЯ БЛОКА ПРОДУКЦИИ В PDF ФАЙЛ
document.getElementById('download-price').addEventListener('click', function (event) {
    event.preventDefault();

    // Выбираем элемент, который нужно сохранить
    const element = document.querySelector('.products'); 

    // Клонируем элемент для PDF
    const clone = element.cloneNode(true);

    // Убираем элементы с заданными классами только в копии
    ['.name-product', '.item-product-btn', '.name-catalog-product', '.item-product-exemple'].forEach(selector => {
        const elements = clone.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = 'none'; // Скрываем элементы
        });
    });
    // Убираем задний фон из копии
    clone.style.background = 'none';
    clone.style.backgroundImage = 'none';
    // Применяем фиксированные инлайн-стили к клону
    clone.style.width = '700px';
    clone.style.margin = '0 auto'; // Центрируем блок на странице
    clone.style.padding = '0px'; // Убираем лишние отступы
    clone.style.fontSize = '14px';
    clone.style.boxSizing = 'border-box'; // Учитываем отступы и размеры
    clone.style.gap = "0px";

    // Применяем фиксированные стили к вложенным элементам
    const items = clone.querySelectorAll('.item-product');
    items.forEach((item, index) => {
        item.style.display = 'flex';
        item.style.flexDirection = 'column';
        item.style.justifyContent = 'center';
        item.style.alignItems = 'center';
        item.style.gap = "0px";

        // Добавляем перенос на новую страницу, начиная со второго блока
        if (index > 0) {
            item.style.pageBreakBefore = 'always'; // Переносим блок на новую страницу
        }
    });
    // Стили для заголовка блока продукции
    const nameProduct = clone.querySelectorAll('.name-product');
    nameProduct.forEach(name => {
        name.style.fontSize = '22px';
    });

    // Стили для элементов меню продукта
    const itemProductMenu = clone.querySelectorAll('.item-product-menu');
    itemProductMenu.forEach(menu => {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.justifyContent = 'center';
        menu.style.alignItems = 'center';
    });

    // Стили для изображений продуктов
    const productImages = clone.querySelectorAll('.item-product-menu img');
    productImages.forEach(img => {
        img.style.width = '270px';
        img.style.height = '270px';
    });

    // Стили для названий продуктов
    const productNames = clone.querySelectorAll('.item-product-menu h1');
    productNames.forEach(name => {
        name.style.fontSize = '20px';
    });

    // Стили для стоимости продуктов
    const productPrices = clone.querySelectorAll('.item-product-menu p');
    productPrices.forEach(price => {
        price.style.margin = '10px';
        price.style.fontSize = '20px';
    });

    // Стили для текста параметров
    const ulElements = clone.querySelectorAll('ul li');
    ulElements.forEach(li => {
        li.style.lineHeight = '1.5';
        li.style.fontSize = '12px';
    });
    // Настройки для html2pdf
    const options = {
        margin: 0.5, // Поля на странице PDF
        filename: 'pricelist.pdf', // Имя файла
        image: { type: 'jpeg', quality: 0.98 }, // Формат и качество изображений
        html2canvas: {
            scale: 2, // Масштаб для повышения качества
            useCORS: true, // Для работы с кросс-доменными изображениями
            scrollY: 0 // Убирает смещение
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } // Формат страницы
    };

    // Создаем временный контейнер для клонированного элемента
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '700px'; // Фиксируем ширину контейнера
    container.appendChild(clone);
    document.body.appendChild(container);

    // Создаем PDF из клонированного элемента
    html2pdf().set(options).from(clone).save().then(() => {
        // Удаляем временный контейнер после создания PDF
        document.body.removeChild(container);
    }).catch(err => {
        console.error('Ошибка при создании PDF:', err);
        // Удаляем временный контейнер в случае ошибки
        document.body.removeChild(container);
    });
});

// ДОБАВИТЬ ЗАКАЗ В ФОРМУ
document.addEventListener('DOMContentLoaded', () => {
    // Найти все кнопки "ЗАКАЗАТЬ"
    const orderButtons = document.querySelectorAll('.item-product-btn');
    const inputField = document.getElementById('input-field-first'); // Поле формы для наименования товара

    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Останавливаем стандартное поведение

            // Найти родительский элемент .item-product-menu
            const productMenu = button.closest('.item-product-menu');

            // Найти наименование товара (текст внутри <h1>)
            const productName = productMenu.querySelector('h1').textContent;

            // Проверить, есть ли уже этот товар в поле формы
            const currentItems = inputField.value.split(', ').map(item => item.trim());
            if (!currentItems.includes(productName)) {
                if (inputField.value) {
                    inputField.value += `, ${productName}`;
                } else {
                    inputField.value = productName;
                }
            }

            // Программно прокрутить страницу к форме
            const formContainer = document.querySelector('#first-form-container');
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

