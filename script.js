

document.addEventListener('DOMContentLoaded', () => {
    
let date = new Date();
let showedYear = date.getFullYear();
let showedMonth = date.getMonth();
const calendar = document.querySelector('#calendar');
const elementYear = document.querySelector('.year')
const prev = document.querySelector('.prev');
const next = calendar.querySelector('.next');
const elementMonth = document.querySelector('.month')
const btnCalendar = document.querySelector('.btn-calendar')
const modal = document.querySelector('.modal')
const btnMode = document.querySelector('.toggle-button')
const modeTitle = document.querySelector('.mode-title')

const getIsToday = (day) => {
    console.log(date)
    const d = new Date(date.getFullYear(), date.getMonth(), day)
    return d.getTime() === new Date().setHours(0, 0, 0, 0)
};
initCalendar(showedYear, showedMonth, calendar);

function drawDates(year, month, dates, info) {
    let arr = [];
    let firstDate = 1;
    let lastDate = getLastDay(year, month);
    let shiftEmptyElem = getShiftEmptyElem(year, month);
    let popEmptyElem = getPopEmptyElem(year, month);
    arr = createArr (firstDate, lastDate);
    arr = shiftElems(shiftEmptyElem, '', arr);
    arr = pushElems(popEmptyElem, '', arr);
    arr = divideArr(7, arr);
    console.log(info)
    createTable(arr, dates, info);
}


 function initCalendar(year, month, calendar){
     let dates = calendar.querySelector('.dates');
     let info = calendar.querySelector('.month');
     console.log(info)
     drawDates(year, month, dates, info);
     drawMonthYear(year, month, info)
 }
 


function getLastDay(year, month){
    if(month == 1){
        if(leapYear(year)){
            return 29;
        } else {
            return 28
        }
    } else{
    let days = [31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month];
    }
}
function leapYear(year){
  if (year % 4 == 0) {
    return true;
  } else {
      return false;
  }
}
function getNumOfDay (num) {
   return num += 1
}

function getFirstDayOfMonth (year, month) {
    let date = new Date(year, month, 1);
    return date.getDay();

}


function getShiftEmptyElem (year, month) {
   let dayNumber = getFirstDayOfMonth(year, month);
   let dayNum = getNumOfDay(dayNumber)
   return dayNum - 1;

}
function getPopEmptyElem(year, month) {
   let dayNumber = getLastDayOfMonth(year, month);
   let dayNum = getNumOfDay(dayNumber)
   return 7 - dayNum;
}
function getLastDayOfMonth (year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDay();

}
function createArr(from, to){
    var arr = [];
    for(let i = from; i <= to; i++){
       arr.push(i);
    }
    return arr
}
function shiftElems(num, elem, arr){
    for(let i = 0; i < num; i++){
        arr.unshift(elem);
    }
    return arr;
}
function pushElems(num, elem, arr){
    for(let i = 0; i < num; i++ ){
        arr.push(elem)
    }
    return arr;
}
function divideArr(num, arr){
    let newArr = [];
    let segment = [];
    let iterCount = arr.length / num;
   for(let i = 0; i < iterCount; i++){
       segment = arr.splice(0, num);
       newArr.push(segment);
   }
   
    return newArr;
}


function drawMonthYear(year, month, info){
    info.innerHTML = getMonthName(month)
 }


function createTable(arr, parent, info){
    parent.innerHTML = '';
   
    for(let i = 0; i < arr.length; i++){
        let tr = document.createElement('tr');
        for(let a = 0; a < arr[i].length; a++){
        let td = document.createElement('td');
        td.innerHTML = arr[i][a];
      
        td.classList.add('td-days')
        tr.appendChild(td);
        }
        parent.appendChild(tr);
        const td = document.querySelectorAll('.td-days');
        let selectedDayArray = [];
        console.log(selectedDayArray)
        td.forEach((days) => {
            const d = new Date(date.getFullYear(), date.getMonth(), +days.textContent)

            if( getIsToday(+days.textContent) ){
                console.log(1)
                if(!btnMode.checked){
                    days.classList.add('current-day')
                }else{
                    days.classList.add('current-day-white')
                }
            }
             
            days.addEventListener('click', ()=>{
                selectedDayArray.push(days.textContent)
               console.log(selectedDayArray)
                if(+days.textContent !== 0 ){
                    days.classList.add('selected-day')
                }
                if(!days.classList.contains('current-day')){
                    days.style.borderRadius = '50%'
                }
                if(selectedDayArray.length >= 3){
                    selectedDayArray = [];
                    let arr = [];
                    td.forEach((days)=>{

                        days.classList.remove('selected-day')
                    })
                }
            })
        })
        
    }
    
}



function getMonthName(num){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', "December"];
    return months[num];
}

function getPrevYear(year, month){
   if(month == 0){
         return year - 1;
   }else{
       return year;
   }
}
function getNextYear(year, month){
    if(month == 11){
          return year + 1;
    } else{
        return year;
    }
 }
function getPrevMonth(month){
   if (month == 0){
       return 11
   }else{
        date.setMonth(date.getMonth() - 1)
       return month -1;
   }
}
function getNextMonth(month){
    if (month == 11){
        return 0
    }else{
        date.setMonth(date.getMonth() + 1)
        return month + 1;
    }
 }

 
prev.addEventListener('click', function() {
    showedYear = getPrevYear(showedYear, showedMonth);
    elementYear.innerHTML = showedYear
    showedMonth = getPrevMonth(showedMonth);
    initCalendar(showedYear, showedMonth, calendar);

})
next.addEventListener('click', function() {
    showedYear = getNextYear(showedYear, showedMonth);
    elementYear.innerHTML = showedYear
    showedMonth = getNextMonth(showedMonth);
    initCalendar(showedYear, showedMonth, calendar);
})

btnCalendar.addEventListener('click',() => {
    modal.classList.add('show')
    modal.style.display = 'flex'
    modal.style.justifyContent = 'center'
})

modal.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.style.display = 'none'
    }
})
document.addEventListener('keydown', (e) => {
    if(e.keyCode === 27){
        modal.style.display = 'none'
    }
})



btnMode.addEventListener('click', () => {
    console.log('1')
    if(calendar.style.backgroundColor === 'white'){
        initCalendar(showedYear, showedMonth, calendar);
        modeTitle.textContent = 'Dark Mode'
        calendar.style.backgroundColor = 'rgb(4, 4, 32)'
        calendar.style.color = 'white'
        prev.style.color = 'white'
        next.style.color = 'white'

    }else{
        initCalendar(showedYear, showedMonth, calendar);
        calendar.style.backgroundColor = 'white'
        modeTitle.textContent = 'Light Mode'
        calendar.style.color = 'rgb(4, 4, 32)'
        prev.style.color = 'rgb(4, 4, 32)'
        next.style.color = 'rgb(4, 4, 32)'
    }
})
})