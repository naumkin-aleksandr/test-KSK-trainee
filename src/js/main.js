// "use strict";

let arrayCards = [];

const data = JSON.parse(localStorage.getItem("arrayCards"));

console.log(data);
if (data) {
    arrayCards = data;
} else {
    arrayCards = [
        {
            id: 1,
            timeCreation: 200,
            numberAccount: 145454,
            timeArrival: 4555,
            typeOrder: "RUEX",
        },
        {
            id: 300,
            timeCreation: 1000,
            numberAccount: 244,
            timeArrival: 4555,
            typeOrder: "RUED",
        },
        {
            id: 200,
            timeCreation: 500,
            numberAccount: 666,
            timeArrival: 888,
            typeOrder: "RUSG",
        },
    ];
}

window.addEventListener("unload", () => {});

const card = document.querySelector("#card"),
    btnSaveCard = document.querySelector("#btn-save-card"),
    btnCreateCard = document.querySelector("#btn-create-card"),
    additionBox = document.querySelector("#addition-box"),
    shieldBlackout = document.querySelector("#shield-blackout"),
    elemNumberAccount = document.querySelector("#addition-invoice-number"),
    elemTimeArrival = document.querySelector("#addition-arrival-time"),
    elemTypeOrder = document.querySelector("#addition-type-order"),
    btnClearAddition = document.querySelector("#btn-cler-addition"),
    btnSortingOpenList = document.querySelector("#btn-sorting-open-list"),
    sortingList = document.querySelector("#sorting-list"),
    shieldTransparent = document.querySelector("#shield-transparent"),
    inputFilter = document.querySelectorAll(".filters__input"),
    notFoundBox = document.querySelector("#not-found"),
    filterIDInvoice = document.querySelector("#filter-ID-invoice"),
    filterNumberAccount = document.querySelector("#filter-number-Account"),
    filterTimeArrival = document.querySelector("#filter-time-Arrival"),
    filtertypeOrder = document.querySelector("#filter-type-Order");

filterIDInvoice.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter((el) => el.id === value);
        findCard(filterdArray);
    }
});

filterNumberAccount.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter(
            (el) => el.numberAccount === value
        );
        findCard(filterdArray);
    }
});

filterTimeArrival.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter(
            (el) => el.timeArrival === value
        );
        findCard(filterdArray);
    }
});

filtertypeOrder.addEventListener("keydown", (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
        const filterdArray = arrayCards.filter((el) => el.typeOrder === value);
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
        <div class="card__item">
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

function addCard() {
    const numberAccount = elemNumberAccount.value,
        timeArrival = elemTimeArrival.value;

    if (numberAccount && timeArrival) {
        const date = new Date();
        const hours = String(date.getHours());
        const minutes = String(date.getMinutes());
        const timeCreation = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${
            hours.length === 1 ? 0 + hours : hours
        }:${minutes.length === 1 ? 0 + minutes : minutes}
        `;
        const id = `${timeCreation.replace(/[^\d]/g, "")}${Math.floor(
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

        localStorage.setItem("arrayData", JSON.stringify(arrayCards));

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
    const target = event.target.id;
    switch (target) {
        case "ID-ascending":
            arrayCards.sort((a, b) => b.id - a.id);
            displayListCard(arrayCards);
            hideSortingList();
            break;

        case "ID-descending":
            arrayCards.sort((a, b) => a.id - b.id);
            displayListCard(arrayCards);
            hideSortingList();
            break;

        case "date-creation-ascending":
            arrayCards.sort(
                (a, b) =>
                    +clearTimeCreation(b.timeCreation) -
                    +clearTimeCreation(a.timeCreation)
            );
            displayListCard(arrayCards);
            hideSortingList();
            break;

        case "date-creation-descending":
            arrayCards.sort(
                (a, b) =>
                    +clearTimeCreation(a.timeCreation) -
                    +clearTimeCreation(b.timeCreation)
            );
            displayListCard(arrayCards);
            hideSortingList();
            break;

        case "type-order-RUED":
            arrayCards = [
                ...arrayCards.filter((el) => el.typeOrder === "RUED"),
                ...arrayCards.filter((el) => el.typeOrder !== "RUED"),
            ];
            displayListCard(arrayCards);
            hideSortingList();
            break;

        case "type-order-RUEX":
            arrayCards = [
                ...arrayCards.filter((el) => el.typeOrder === "RUEX"),
                ...arrayCards.filter((el) => el.typeOrder !== "RUEX"),
            ];
            displayListCard(arrayCards);
            hideSortingList();
            break;

        case "type-order-RUSG":
            arrayCards = [
                ...arrayCards.filter((el) => el.typeOrder === "RUEX"),
                ...arrayCards.filter((el) => el.typeOrder !== "RUSG"),
            ];
            displayListCard(arrayCards);
            hideSortingList();
            break;
    }
}
