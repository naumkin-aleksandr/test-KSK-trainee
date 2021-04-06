"use strict";

let arrayCards = JSON.parse(localStorage.getItem("data"));

if (!arrayCards) {
    arrayCards = [
        {
            id: "202021411459999",
            timeCreation: "2020/02/14 11:45",
            numberAccount: "10",
            timeArrival: "10",
            typeOrder: "RUEX",
        },
        {
            id: "202021510307777",
            timeCreation: "2020/02/15 10:30",
            numberAccount: "11",
            timeArrival: "12",
            typeOrder: "RUED",
        },
        {
            id: "20203213106666",
            timeCreation: "2020/03/02 13:10",
            numberAccount: "15",
            timeArrival: "14",
            typeOrder: "RUSG",
        },
    ];
}

const card = document.querySelector("#card");
const btnSaveCard = document.querySelector("#btn-save-card");
const btnCreateCard = document.querySelector("#btn-create-card");
const additionBox = document.querySelector("#addition-box");
const shieldBlackout = document.querySelector("#shield-blackout");
const elemNumberAccount = document.querySelector("#addition-invoice-number");
const elemTimeArrival = document.querySelector("#addition-arrival-time");
const elemTypeOrder = document.querySelector("#addition-type-order");
const btnClearAddition = document.querySelector("#btn-cler-addition");
const btnSortingOpenList = document.querySelector("#btn-sorting-open-list");
const sortingList = document.querySelector("#sorting-list");
const shieldTransparent = document.querySelector("#shield-transparent");
const inputFilter = document.querySelectorAll(".filters__input");
const notFoundBox = document.querySelector("#not-found");
const filterIDInvoice = document.querySelector("#filter-ID-invoice");
const filterNumberAccount = document.querySelector("#filter-number-Account");
const filterTimeArrival = document.querySelector("#filter-time-Arrival");
const filtertypeOrder = document.querySelector("#filter-type-Order");

filterIDInvoice.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter(({ id }) => id === value);
        findCard(filterdArray);
    }
});

filterNumberAccount.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter(
            ({ numberAccount }) => numberAccount === value
        );
        findCard(filterdArray);
    }
});

filterTimeArrival.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter(
            ({ timeArrival }) => timeArrival === value
        );
        findCard(filterdArray);
    }
});

filtertypeOrder.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter(
            ({ typeOrder }) => typeOrder === value
        );
        findCard(filterdArray);
    }
});

displayListCard(arrayCards);

btnSaveCard.addEventListener("click", addCard);

btnCreateCard.addEventListener("click", showAdditionBox);

shieldBlackout.addEventListener("click", hideAdditionBox);

card.addEventListener("click", openToolsCard);

btnClearAddition.addEventListener("click", clearAdditionInput);

sortingList.addEventListener("click", sortArrayCard);

notFoundBox.addEventListener("click", () => {
    notFoundBox.classList.add("visuallyhidden");
});

elemNumberAccount.addEventListener("focus", () => {
    elemNumberAccount.classList.remove("addition__input_error");
});

elemTimeArrival.addEventListener("focus", () => {
    elemTimeArrival.classList.remove("addition__input_error");
});

btnSortingOpenList.addEventListener("click", showSortingList);

shieldTransparent.addEventListener("click", hideSortingList);

for (let item of inputFilter) {
    resetValueInputFilter(item);
}

function resetValueInputFilter(element) {
    element.addEventListener("blur", () => {
        element.value = "";
    });
}

function saveStorage() {
    localStorage.setItem("data", JSON.stringify(arrayCards));
}

function findCard(arr) {
    if (arr.length !== 0) {
        displayListCard(arr);
    } else {
        showNotFoundBox();
    }
}

function showNotFoundBox() {
    notFoundBox.classList.remove("visuallyhidden");
}

function showSortingList() {
    btnSortingOpenList.classList.add("sorting__btn-open-list_active");
    sortingList.classList.remove("visuallyhidden");
    shieldTransparent.classList.add("shield_transparent");
}

function hideSortingList() {
    btnSortingOpenList.classList.remove("sorting__btn-open-list_active");
    sortingList.classList.add("visuallyhidden");
    shieldTransparent.classList.remove("shield_transparent");
}

function openToolsCard(even) {
    const target = even.target;

    if (target.matches(".card__btn-open")) {
        const boxTools = target.nextElementSibling;

        if (target.matches(".card__btn-open_black")) {
            target.classList.remove("card__btn-open_black");
            target.classList.add("card__btn-open_red");
            boxTools.classList.remove("visuallyhidden");
        } else {
            target.classList.add("card__btn-open_black");
            target.classList.remove("card__btn-open_red");
            boxTools.classList.add("visuallyhidden");
        }
    }
}

function createCard(dataCard, index) {
    const {
        id,
        timeCreation,
        numberAccount,
        timeArrival,
        typeOrder,
    } = dataCard;

    const elem = `
        <div class="card__item" draggable="true">
            <h4 class="card__subtitle">Card ${index}</h4>
            <div class="card__wrap-btn-open">
                <button class="card__btn-open card__btn-open_black"></button>
                <div class="card__box-tools visuallyhidden">
                    <button
                        class="card__btn-tools card__btn-tools_icon-edit"
                    >
                        редактировать
                    </button>
                    <button
                        class="card__btn-tools card__btn-tools_icon-delete"
                    >
                        удалить
                    </button>
                </div>
            </div>
            <ul class="card__list-data">
                <li class="card__elem-data">ID: <span>${id}</span></li>
                <li class="card__elem-data">Дата создания:  <span>${timeCreation}</span></li>
                <li class="card__elem-data">Номер накладной:  <span>${numberAccount}</span></li>
                <li class="card__elem-data">Время прибытия:  <span>${timeArrival}</span></li>
                <li class="card__elem-data">Тип заказа:  <span>${typeOrder}</span></li>
            </ul>
        </div>
    `;

    card.insertAdjacentHTML("beforeend", elem);
}

function displayListCard(arr) {
    card.innerHTML = "";
    arr.map((item, index) => createCard(item, index + 1));
}

function getDateValue(value) {
    return String(value).length === 1 ? 0 + value : value;
}

function addCard() {
    const numberAccount = elemNumberAccount.value,
        timeArrival = elemTimeArrival.value;

    if (numberAccount && timeArrival) {
        const date = new Date();
        const month = getDateValue(String(date.getMonth() + 1));
        const day = getDateValue(String(date.getDate()));
        const hours = getDateValue(String(date.getHours()));
        const minutes = getDateValue(String(date.getMinutes()));
        const timeCreation = `${date.getFullYear()}/${month}/${day} ${hours}:${minutes}`;
        const id = `${clearTimeCreation(timeCreation)}${Math.floor(
            Math.random() * 10000
        )}`;

        const typeOrder = elemTypeOrder.value;

        const newCard = {
            id,
            timeCreation,
            numberAccount,
            timeArrival,
            typeOrder,
        };

        arrayCards.push(newCard);
        displayListCard(arrayCards);

        saveStorage();

        console.log(arrayCards);
        clearAdditionInput();
    } else {
        if (!numberAccount) {
            elemNumberAccount.classList.add("addition__input_error");
        }

        if (!timeArrival) {
            elemTimeArrival.classList.add("addition__input_error");
        }
    }
}

function removeErrorInputAddition() {
    elemNumberAccount.classList.remove("addition__input_error");
    elemTimeArrival.classList.remove("addition__input_error");
}

function clearAdditionInput() {
    elemNumberAccount.value = "";
    elemTimeArrival.value = "";
}

function hideAdditionBox() {
    shieldBlackout.classList.remove("shield_blackout");
    additionBox.classList.add("visuallyhidden");

    removeErrorInputAddition();
}

function showAdditionBox() {
    shieldBlackout.classList.add("shield_blackout");
    additionBox.classList.remove("visuallyhidden");
}

function clearTimeCreation(num) {
    return String(num).replace(/[^\d]/g, "");
}

function sortArrayCard(event) {
    switch (event.target.id) {
        case "ID-ascending":
            arrayCards.sort((a, b) => b.id - a.id);
            displayListCard(arrayCards);
            saveStorage();
            hideSortingList();
            break;

        case "ID-descending":
            arrayCards.sort((a, b) => a.id - b.id);
            displayListCard(arrayCards);
            saveStorage();
            hideSortingList();
            break;

        case "date-creation-ascending":
            arrayCards.sort(
                (a, b) =>
                    +clearTimeCreation(b.timeCreation) -
                    +clearTimeCreation(a.timeCreation)
            );
            displayListCard(arrayCards);
            saveStorage();
            hideSortingList();
            break;

        case "date-creation-descending":
            arrayCards.sort(
                (a, b) =>
                    +clearTimeCreation(a.timeCreation) -
                    +clearTimeCreation(b.timeCreation)
            );
            displayListCard(arrayCards);
            saveStorage();
            hideSortingList();
            break;

        case "type-order-RUED":
            arrayCards = [
                ...arrayCards.filter(({ typeOrder }) => typeOrder === "RUED"),
                ...arrayCards.filter(({ typeOrder }) => typeOrder !== "RUED"),
            ];
            displayListCard(arrayCards);
            saveStorage();
            hideSortingList();
            break;

        case "type-order-RUEX":
            arrayCards = [
                ...arrayCards.filter(({ typeOrder }) => typeOrder === "RUEX"),
                ...arrayCards.filter(({ typeOrder }) => typeOrder !== "RUEX"),
            ];
            displayListCard(arrayCards);
            saveStorage();
            hideSortingList();
            break;

        case "type-order-RUSG":
            arrayCards = [
                ...arrayCards.filter(({ typeOrder }) => typeOrder === "RUSG"),
                ...arrayCards.filter(({ typeOrder }) => typeOrder !== "RUSG"),
            ];
            displayListCard(arrayCards);
            saveStorage();
            hideSortingList();
            break;
    }
}

card.addEventListener("dragstart", (event) => {
    event.target.classList.add("card__item_selected");
});

card.addEventListener("dragend", (event) => {
    event.target.classList.remove("card__item_selected");
});

card.addEventListener("dragover", (event) => {
    event.preventDefault();

    const activeElement = card.querySelector(".card__item_selected");
    const currentElement = event.target.closest(".card__item");

    const isMoveable = activeElement !== currentElement && currentElement;

    if (!isMoveable) {
        return;
    }

    const nextElement =
        currentElement === activeElement.nextElementSibling
            ? currentElement.nextElementSibling
            : currentElement;

    card.insertBefore(activeElement, nextElement);
});
