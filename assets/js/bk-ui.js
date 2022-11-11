/**
 * window, tab 닫기
 * @returns 
 */
function fnCloseWindow() {
    window.close();
}

/**
 * 버스커리스트 가져오기
 * @returns 
 */
function getJson() {
    return fetch("assets/js/busker_list.json")
        .then((response) => response.json())
        .then((json) => json.buskerList);
}

/**
 * 버스커리스트 화면에 보여주기
 * 
 */
function displayList(buskerList, thisDate) {
    const container = document.querySelector(".bk-buskerList__container");
    container.innerHTML = buskerList.map((item) => {
        if (!thisDate)
            return createHTMLString(item);
        if (item.id === thisDate)
            return createHTMLString(item);
        return `
        <li class="bk-buskerList__item">해당일은 공연이 없습니다.</li>
        `;
    }).join("");
}

/**
 * 버스커리스트 날짜별 화면에 보여주기
 * 
 */
 function displayListSort(buskerList, thisDate) {
    const container = document.querySelector(".bk-buskerList__container");
    container.innerHTML = buskerList.map((item) => {
        if (!thisDate)
            return createHTMLString(item);
        if (item.id === thisDate)
            return createHTMLString(item);
        return ``;
    }).join("");
}

/**
 * 날짜 조건
 */
function isToday(value) {
    
}

/**
 * 버스커 리스트 생성
 */
function createHTMLString(item) {
    return `
    <li class="bk-buskerList__item item ${item.id}">
        <div class="item__date">
            <p class="item__day">${item.day}</p>
            <p class="item__week">${item.week}</p>
        </div>
        <div class="item__cate">
            <span>${item.category}</span>
        </div>
        <p class="item__singer">${item.singer}</p>
        <p class="item__place">${item.place}</p>
        <p class="item__time">${item.time}</p>
    </li>`;
}
/**
 * 날짜별 공연 정렬
 */
function sortBusker(date) {
    let thisDate = date;
    getJson().then((buskerList) => {
        displayList(buskerList,thisDate);
    });
    console.log(thisDate);
    // const container = document.querySelector(".bk-buskerList__container");
    // container.innerHTML ='<li class="bk-buskerList__item">해당 날짜에 공연이 없습니다.</li>';
    // container.classList.add('no-data');

}
document.addEventListener("DOMContentLoaded", async function () {
    

    getJson().then((buskerList) => {
        displayList(buskerList);
        console.log(buskerList);
    });
    
    document.getElementById('inputDate').valueAsDate = new Date();

});
