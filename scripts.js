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
const table = document.querySelector("table");
const input = document.querySelector("#input");
const btnCalculate = document.querySelector(".calcul");
const output = document.querySelector(".output")

btnCalculate.addEventListener("click", (e) => {calculate(e)});
table.addEventListener("click", (e) => {
  takeInp(e);
});
btnMonth.addEventListener("change", updateDays);
btnYear.addEventListener("change", updateDays);
btnLeft.addEventListener("click", prevMonth);
btnRight.addEventListener("click", nextMonth);
btnClear.addEventListener("click", clear);
btnToday.addEventListener("click", setToday);
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

function calculate(e) {
  e.preventDefault();
if (input.value){
  try{
    const bd = DateTime.fromFormat(input.value, "dd-MM-yyyy")
    const now = DateTime.now()
    const ageNoFormat = now.diff(bd , ["years",'months','days'])
    const age = `Age: ${Math.floor(ageNoFormat.years)} years, ${Math.floor(ageNoFormat.months)} months, ${Math.floor(ageNoFormat.days)} days`
    output.innerHTML = `<p>${age}</p>`
     }catch{
    alert("wrong date format, try again!")
    input.value = ''
  }
}else{
  alert("BirthDate have not been entered!!!")
}
}

function takeInp(e) {
  if (e.target.textContent) {
    const birthDate = DateTime.local(
      Number(btnYear.value),
      Number(btnMonth.value),
      Number(e.target.textContent)
    ).toFormat("dd-MM-yyyy");
    input.value = birthDate;
    const classes = calendar.classList;
    classes.add("hidden");
  }
}

function setToday() {
  input.value = DateTime.now().toFormat("dd-MM-yyyy");
  const classes = calendar.classList;
  classes.add("hidden");
}

function clear() {
  btnYear.selectedIndex = 0;
  btnMonth.selectedIndex = 0;
  input.value = "";
}

function nextMonth() {
  let month = Number(btnMonth.value) + 1;
  if (month == 13) {
    month = 1;
    const year = Number(btnYear.value) + 1;
    btnYear.innerHTML += `<option value="${year}">${year}</option>`;
    btnYear.value = year;
  }
  btnMonth.value = month;
  updateDays();
}
function prevMonth() {
  let month = Number(btnMonth.value) - 1;
  if (!month) {
    month = 12;
    const year = Number(btnYear.value) - 1;
    btnYear.value = year;
  }
  btnMonth.value = month;
  updateDays();
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
  for (let i = 0; i < 35; i++) {
    tableTd[i].textContent = "";
  }
  while (j <= daysInMonth && index < 35) {
    tableTd[index].textContent = j;
    j++;
    index++;
  }
  if (tableTd[34].textContent !== j || tableTd[34].textContent !== "") {
    index = 0;
    while (j <= daysInMonth) {
      tableTd[index].textContent = j;
      j++;
      index++;
    }
  }
}
