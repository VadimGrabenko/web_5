document.addEventListener("DOMContentLoaded", () => {
    // Значення основи та висоти паралелограма
    const base = 10; // Задайте значення основи
    const height = 5; // Задайте значення висоти

    // Функція для обчислення площі паралелограма
    function calculateParallelogramArea(base, height) {
        return base * height;
    }

    // Обчислюємо площу
    const area = calculateParallelogramArea(base, height);

    // Знаходимо блок "5"
    const block5 = document.querySelector(".block5");

    if (block5) {
        // Створюємо новий елемент для виводу результату
        const resultElement = document.createElement("p");
        resultElement.textContent = `Площа паралелограма: ${area} кв. одиниць`;

        // Додаємо елемент у кінець блоку "5"
        block5.appendChild(resultElement);

        console.log("Площа паралелограма успішно обчислена та виведена!");
    } else {
        console.error("Блок '5' не знайдено!");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("numberForm");
    const numberInput = document.getElementById("numberInput");
    const numberFormContainer = document.querySelector(".number-form");

    // Перевірка наявності cookies
    const savedMaxDigit = getCookie("maxDigit");

    if (savedMaxDigit) {
        // Якщо cookies існують
        if (confirm(`Збережена максимальна цифра: ${savedMaxDigit}. Після натискання "ОК" дані будуть видалені.`)) {
            // Видалення cookies
            deleteCookie("maxDigit");
            alert("Cookies видалено!");
            location.reload(); // Перезавантаження сторінки
        }
        // Приховуємо форму
        numberFormContainer.style.display = "none";
        return;
    }

    // Обробник форми
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const number = numberInput.value;
        if (!number) return;

        // Знаходимо максимальну цифру
        const maxDigit = findMaxDigit(number);

        // Зберігаємо в cookies
        setCookie("maxDigit", maxDigit, 1); // Зберігаємо на 1 день

        // Виводимо результат
        alert(`Максимальна цифра: ${maxDigit}`);
    });

    // Функція для пошуку максимальної цифри
    function findMaxDigit(number) {
        return Math.max(...number.split("").map(Number));
    }

    // Функції для роботи з cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return value;
            }
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    }
});

// Відновлення вирівнювання з localStorage при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
    const blocksToAlign = ["block2", "block4", "block5"];

    blocksToAlign.forEach(blockClass => {
        const alignment = localStorage.getItem(blockClass);
        if (alignment === "right") {
            const block = document.querySelector(`.${blockClass}`);
            if (block) block.style.textAlign = "right";
        }
    });

    // Додаємо обробник події mouseout
    document.querySelectorAll(".block").forEach(block => {
        block.addEventListener("mouseout", handleMouseOut);
    });
});

// Функція для обробки події mouseout
function handleMouseOut() {
    const selectedBlock = document.querySelector('input[name="block"]:checked');
    if (!selectedBlock) return;

    const blockClass = selectedBlock.value;
    const block = document.querySelector(`.${blockClass}`);

    if (block) {
        // Встановлення вирівнювання по правому краю
        block.style.textAlign = "right";

        // Збереження в localStorage
        localStorage.setItem(blockClass, "right");
        console.log(`Вирівнювання для ${blockClass} збережено.`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("resetAlignment");

    resetButton.addEventListener("click", () => {
        const blocks = document.querySelectorAll(".block2, .block4, .block5");

        blocks.forEach(block => {
            block.style.textAlign = ""; // Скидає властивість вирівнювання
        });

        // Очищення збережених даних з localStorage
        localStorage.removeItem("block2Alignment");
        localStorage.removeItem("block4Alignment");
        localStorage.removeItem("block5Alignment");

        alert("Вирівнювання скинуто для всіх блоків!");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const blocks = [1, 2, 3, 4, 5, 6, 7];

    blocks.forEach(blockNumber => {
        const select = document.getElementById(`block${blockNumber}Select`);
        const contentDiv = document.getElementById(`block${blockNumber}Content`);
        const saveButton = document.getElementById(`saveBlock${blockNumber}List`);

        if (select && contentDiv && saveButton) {
            // Додаємо слухача на select
            select.addEventListener("change", () => {
                if (select.value === "addItem") {
                    const newItemText = prompt("Введіть текст для нового пункту списку:");
                    if (newItemText) {
                        const list = contentDiv.querySelector("ol") || document.createElement("ol");
                        const newItem = document.createElement("li");
                        newItem.textContent = newItemText;
                        list.appendChild(newItem);
                        contentDiv.appendChild(list);
                    }
                }
            });

            // Додаємо слухача на кнопку збереження
            saveButton.addEventListener("click", () => {
                const listItems = contentDiv.querySelectorAll("li");
                const itemsArray = Array.from(listItems).map(item => item.textContent);

                if (itemsArray.length > 0) {
                    localStorage.setItem(`block${blockNumber}List`, JSON.stringify(itemsArray));
                    alert(`Список для блоку ${blockNumber} збережено в localStorage.`);
                } else {
                    alert(`Список для блоку ${blockNumber} порожній.`);
                }
            });
        }
    });

    // Видаляємо дані з localStorage при перезавантаженні сторінки
    window.addEventListener("beforeunload", () => {
        blocks.forEach(blockNumber => {
            localStorage.removeItem(`block${blockNumber}List`);
        });
    });
});
