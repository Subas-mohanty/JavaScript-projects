let isDobOpen=false;
let dateOfBirth;
const settingIcon = document.getElementById('settingIcon');
const settingContent = document.getElementById('settingContent');
const initial = document.getElementById('initial');
const afterDob = document.getElementById('afterDob');
const btnDob = document.getElementById('btnDob');
const dobInp = document.getElementById('dobInp');

const yearEl=document.getElementById('year');
const monthEl=document.getElementById('month');
const dayEl=document.getElementById('day');
const hourEl=document.getElementById('hour');
const minuteEl=document.getElementById('minute');
const secondEl=document.getElementById('second');

const makeTwoDigit=(number)=>{
    return number>9?number:`0${number}`;
}

const toggle = ()=>{
    if(isDobOpen){
        settingContent.classList.add("hide");
    }
    else{
        settingContent.classList.remove("hide");
    }

    isDobOpen=!isDobOpen;
    // console.log("toggle",isDobOpen);
};

const updateAge=()=>{
    const currentDate=new Date();
    const dateDiff=currentDate-dateOfBirth;
    console.log(dateOfBirth);
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
    const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
    const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
    const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
    const second = Math.floor(dateDiff / 1000) % 60;
    // console.log(year,month,day,hour,minute,second);
    // console.log(currentDate);
    // console.log(dateDiff);

    yearEl.innerHTML=makeTwoDigit(year);
    monthEl.innerHTML=makeTwoDigit(month);
    dayEl.innerHTML=makeTwoDigit(day);
    hourEl.innerHTML=makeTwoDigit(hour);
    minuteEl.innerHTML=makeTwoDigit(minute);
    secondEl.innerHTML=makeTwoDigit(second);
}

const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");
    if (year && month && date) {
      dateOfBirth = new Date(year, month, date);
    }
  
    updateAge();
  };

const contentToggler = () => {
    updateAge();
    if (dateOfBirth) {
      initial.classList.add("hide");
      afterDob.classList.remove("hide");
    } else {
      afterDob.classList.add("hide");
      initial.classList.remove("hide");
    }
  };

const setDobHandler=()=>{
    const dateString=dobInp.value;
    dateOfBirth=new Date(dateString);

    dateOfBirth = dateString ? new Date(dateString) : null;

    if (dateOfBirth) {
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());
    }
    contentToggler();
    setInterval(() => updateAge(), 1000);

    localStorageGetter();
    contentToggler();
}

settingIcon.addEventListener('click',toggle);
btnDob.addEventListener('click',setDobHandler);
