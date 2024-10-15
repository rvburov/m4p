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

//ФОРМА ЗАЯВКИ ДЛЯ БЕСПЛАТНОГО АУДИТА

document.addEventListener('DOMContentLoaded', function () {
    let currentQuestion = 1;
    const totalQuestions = 5;

    const questions = [
        { label: "Выберите товар:", placeholder: "Выберите товар" },
        { label: "Количество:", placeholder: "Укажите количество товара" },
        { label: "Имя:", placeholder: "Укажите свое имя" },
        { label: "Телефон:", placeholder: "Введите ваш номер телефона" },
        { label: "Комментарий:", placeholder: "Оставьте комментарий", type: "text" }
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

    const answers = new Array(totalQuestions).fill('');

    function updateForm() {
        const progressPercent = (currentQuestion / totalQuestions) * 100;
        progressElement.style.width = `${progressPercent}%`;
        questionCounter.textContent = `Вопрос ${currentQuestion} / ${totalQuestions}`;

        formLabel.textContent = questions[currentQuestion - 1].label;
        inputField.placeholder = questions[currentQuestion - 1].placeholder;

        if (questions[currentQuestion - 1].type === "file") {
            inputField.type = "file";
        } else {
            inputField.type = "text";
        }

        inputField.value = answers[currentQuestion - 1] || '';
        errorMessage.style.display = 'none';
        prevButton.style.display = currentQuestion > 1 ? 'inline-block' : 'none';
    }

    function sendEmail() {
        const templateParams = {
            product: answers[0],
            quantity: answers[1],
            name: answers[2],
            phone: answers[3],
            comment: answers[4],
        };

        emailjs.send("service_mn97v0m", "template_1hkv0sm", templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Заявка отправлена успешно!');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Ошибка отправки заявки. Пожалуйста, попробуйте снова.');
            });
    }

    function goToNextQuestion() {
        answers[currentQuestion - 1] = inputField.value.trim();

        if (questions[currentQuestion - 1].type !== "file" && inputField.value.trim() === '') {
            errorMessage.textContent = 'Пожалуйста, заполните поле перед переходом к следующему вопросу.';
            errorMessage.style.display = 'block';
            return;
        }

        if (currentQuestion === totalQuestions) {
            auditForm.style.display = 'none';
            questionCounter.style.display = 'none';
            successMessage.style.display = 'block';
            sendEmail();
        } else {
            currentQuestion++;
            updateForm();
        }
    }

    nextButton.addEventListener('click', goToNextQuestion);

    prevButton.addEventListener('click', function () {
        answers[currentQuestion - 1] = inputField.value.trim();

        if (currentQuestion > 1) {
            currentQuestion--;
            updateForm();
        }
    });

    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToNextQuestion();
        }
    });

    updateForm();
});

