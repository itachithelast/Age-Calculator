const calendarBtn = document.querySelector("#calendar-btn");
const calendar = document.querySelector(".calendar");
const { DateTime } = luxon;
const btnLeft = document.querySelector("#left")
const btnLight = document.querySelector("#right")
const btnYear = document.querySelector("#year")
const btnMonth = document.querySelector("#month")
const btnToday = document.querySelector("#btn-today")
const btnClear = document.querySelector("#btn-clear")
const tableTd = document.querySelectorAll("td")



function loadCalendar() {
  const dt = DateTime.now();
  const year = dt.year; 
  const monthLong = dt.monthLong; 
  const month = dt.month
  const day = dt.day;

  btnYear.textContent = year
  btnMonth.textContent = monthLong

  const daysInMonth = dt.daysInMonth;
  loadDays(year,month,day,daysInMonth)
}

function loadDays(year,month,daysInMonth){
    const firstWeekdayIndex = DateTime.local(year , month , 1).weekday - 1
    let j = 1
    for (let i = firstWeekdayIndex ; i <= daysInMonth ; i++){
        tableTd[i].textContent = j
        j++
    }
}
calendarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const classes = calendar.classList;
  if (classes.contains("hidden")) {
    classes.remove("hidden");
    loadCalendar();
  } else {
    classes.add("hidden");
  }
});
