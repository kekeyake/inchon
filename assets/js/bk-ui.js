/**
 * window, tab 닫기
 * @returns 
 */
function fnCloseWindow() {
    window.close();
}
/**
 * 동적으로 년도 append 
 */ 
 function creatYearOption(selectId){
	var select = document.getElementById(selectId);

    var date = new Date();
    var year = date.getFullYear();
    var idx = 0;
    
    for(var i=year-5; i<=year; i++){
        const elOption = document.createElement('option');
        elOption.value = i;
        elOption.text = i+"년";        
        select.prepend(elOption);
        idx++;
    }
    select.childNodes[0].selected = true;
}

/**
 * 동적으로 월 생성
 * buskerMonth
 */
 function creatMonthOption(selectId){
	var select = document.getElementById(selectId);
    var idx = 0;
    
    for(var i=1; i<13; i++){
        const elOption = document.createElement('option');
        elOption.value = i;
        elOption.text = i+"월";        
        select.append(elOption);
        idx++;
    }
    select.childNodes[0].selected = true;
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
 * 버스커리스트 처음 화면에 보여주기
 * 
 */
function displayList(buskerList) {
    let bkDate = new Date();
    var current_year = bkDate.getFullYear().toString();
    const container = document.querySelector(".bk-buskerList__container");
    let filterBuskerList = buskerList.filter(item => item.year === current_year);
    container.innerHTML = filterBuskerList.map((item) => createHTMLString(item)).join("");
}

/**
 * 버스커리스트 연도별 화면에 보여주기
 * 
 */
 function displayListSortYears(buskerList, thisDate) {
    const container = document.querySelector(".bk-buskerList__container");
    let monthSelect = document.getElementById("buskerMonth");
    monthSelect.value = "ALL";
    
    let filterBuskerList = buskerList.filter(item => item.year === thisDate);
    if(filterBuskerList.length < 1) {
        container.classList.add('no-data');
        container.innerHTML ='<li class="bk-buskerList__item">해당년에는 공연이 없습니다.</li>';                
        return;       
    }    
    container.innerHTML = filterBuskerList.map((item) => createHTMLString(item)).join("");
    container.classList.remove('no-data');
}

/**
 * 버스커리스트 월별 화면에 보여주기
 * 
 */
 function displayListSortMonth(buskerList, thisDate) {
    const container = document.querySelector(".bk-buskerList__container");
    let filterBuskerList = buskerList.filter(item => item.month === thisDate);

    if(filterBuskerList.length < 1) {
        container.classList.add('no-data');
        container.innerHTML ='<li class="bk-buskerList__item">해당월에는 공연이 없습니다.</li>';
        return;
       
    }
    container.innerHTML = filterBuskerList.map((item) => createHTMLString(item)).join("");
    container.classList.remove('no-data');
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
 * 년도 공연 정렬
 */
function sortBuskerYears(date) {
    let thisDate = date;    
    getJson().then((buskerList) => {
        displayListSortYears(buskerList, thisDate);
    });
}
/**
 * 년도 공연 정렬
 */
 function sortBuskerMonth(date,year) {
    let thisDate = date;
    let thisYear = year;
    if (thisDate === "ALL" && thisYear === "2022") {
        getJson().then((buskerList) => {
            displayList(buskerList);
        });
        return;
    }
    
    getJson().then((buskerList) => {
        displayListSortMonth(buskerList, thisDate);
    });
}



document.addEventListener("DOMContentLoaded", async function () {
    
    // json parser
    getJson().then((buskerList) => {
        displayList(buskerList);
    });

    // select 초기화
    creatYearOption('buskerYears');
    creatMonthOption('buskerMonth');

    const yearSelet = document.querySelector("#buskerYears");
    const monthSelet = document.querySelector("#buskerMonth");
    yearSelet.addEventListener('change',function(){
        sortBuskerYears(this.value);
    });
    monthSelet.addEventListener('change',function(){
        sortBuskerMonth(this.value,yearSelet.value);
    });
});
