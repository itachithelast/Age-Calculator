const calendarBtn = document.querySelector("#calendar-btn");
const calendar = document.querySelector(".calendar");
const { DateTime } = luxon;
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnYear = document.querySelector("#year");
const btnMonth = document.querySelector("#month");
const btnToday = document.querySelector("#btn-today");
const btnClear = document.querySelector("#btn-clear");
const tableTd = document.querySelectorAll("td");

btnMonth.addEventListener("change", updateDays);
btnYear.addEventListener("change", updateDays);
btnLeft.addEventListener("click", prevMonth);
btnRight.addEventListener("click", nextMonth);

function nextMonth() {
  let month = Number(btnMonth.value) + 1;
  month = month > 12 ? month - 12 : month
  btnMonth.value = month;
  updateDays();
}
function prevMonth() {
    let month = Number(btnMonth.value) - 1;
    if(!month){
        month = 12
        const year = Number(btnYear.value) - 1;
        btnYear.value = year
    }
    btnMonth.value = month;
    updateDays()
}

function updateDays() {
  const newYear = Number(btnYear.value);
  const newMonth = Number(btnMonth.value);
  loadDays(newYear, newMonth);
}

function loadCalendar() {
  const dt = DateTime.now();
  const year = dt.year;
  const month = dt.month;
  const day = dt.day;
  btnMonth.value = month;

  loadDays(year, month);
  loadYears(year);
}

function loadYears(year) {
  for (let i = year; i > year - 100; i--) {
    btnYear.innerHTML += `<option value="${i}">${i}</option>`;
  }
}

function loadDays(year, month) {
  const daysInMonth = DateTime.local(year, month).daysInMonth;
  let index = DateTime.local(year, month, 1).weekday - 1;
  let j = 1;
  for (let i = 0 ; i < 35 ; i++){
    tableTd[i].textContent = ''
  }
  while (j <= daysInMonth && index<35 ){
    tableTd[index].textContent = j
    j++
    index++
  }
  if (tableTd[34].textContent!==j || tableTd[34].textContent!==""){
    index = 0
    while (j<=daysInMonth){
    tableTd[index].textContent = j
        j++
        index++
    }
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
