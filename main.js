const moment = require("moment/moment")

function getCurrentDay(){
   return moment().format("dddd")
}

function getCurrentMonth(){
   return moment().format("MMMM")
}

function getCurrentYear(){
    return moment().format("YYYY")
}

function getCurrentDate(){
    return moment().format("dddd, MMMM D, YYYY")
}

function  isWeekend(){
    const day =moment().day()
    if(day == 6 || day == 7){
        return "Today is a weekend"
    } else{
        return "Today is a weekday"
    }
}

function getDaysUntilNewYear(){
    const day = moment().format('DDD')
    const daysUntilNY = 365 - Number(day) 
     return `${daysUntilNY} days until New Year`
}

function getAge(date){
    const now = moment()
    const bd = moment(date)
    return `You are ${now.diff(bd,'years' )} years old`
}

function getDaysUntilBirthday(birthday) {
    const now = moment()
    let birthdayDate = moment(birthday).year(now.year())
    if (birthdayDate < now) {
        birthdayDate.add(1, 'year')
    }
    return `${birthdayDate.diff(now, 'days')} days until your birthday`
}

console.log(getCurrentDay())
console.log(getCurrentMonth())
console.log(getCurrentYear())
console.log(getCurrentDate())
console.log(isWeekend())
console.log(getDaysUntilNewYear())
console.log(getAge('2011-03-15'))
console.log(getDaysUntilBirthday('2011-08-03'))