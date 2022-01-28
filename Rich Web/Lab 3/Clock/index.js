//variables to gather the data needed for the timer
var CountDownTimer = new Date();
var TempDate = null;

//var DisplayTimeCountdown = null;
var DisplayTimeCountdown = Rx.Observable.interval(1000);
var TimerDiv = document.getElementById("DisplayTimeCountdown");
var StartTimer = document.getElementById("StartTimer");
var StartTimerClicked = Rx.Observable.fromEvent(StartTimer,"click");
StartTimerClicked.subscribe(() => GetCreditialsForTimer());

function GetCreditialsForTimer()
{
    TimerDiv.innerHTML = "";
    StartTimer.disabled = true;
    let HourInput = document.getElementById("hourInput").value;
    let MinuteInput = document.getElementById("minuteInput").value;
    let SecondInput = document.getElementById("secondInput").value;

    //set the statements for passing of the varaibles to the timer setup
    let HourStatement = ValidateNumber(HourInput) &&
                    !(TestEmptyString(HourInput)) && HourTest(HourInput);
    let HourParameter = (HourStatement ? HourInput : 0);
    let MinuteStatement = ValidateNumber(MinuteInput) &&
                        !(TestEmptyString(MinuteInput)) && 
                        MinuteAndSecondTest(MinuteInput);
    let MinuteParameter = (MinuteStatement ? MinuteInput : 0);
    let SecondStatement = ValidateNumber(SecondInput) &&
                        !(TestEmptyString(SecondInput)) && 
                        MinuteAndSecondTest(SecondInput);
    let SecondParameter = (SecondStatement ? SecondInput : 0);

    if(HourParameter == 0 && MinuteParameter == 0 && SecondParameter == 0){
        alert("Cannot have a timer with no time or invalid input");
        StartTimer.disabled = false;
        return;
    }else{
        SetTheTimer(HourParameter,MinuteParameter,SecondParameter);
    }
}
//functions to test for the different test cases
function ValidateNumber(InputNumber){
    let NumberTest = /^[0-9]+$/
    return NumberTest.test(InputNumber);
}
function MinuteAndSecondTest(InputNumber){
    return InputNumber < 60;
}
function HourTest(InputNumber){
    return InputNumber < 24;
}
function TestEmptyString(InputNumber){ 
    return InputNumber == "";
}
function TestSingleDigit(Input){
    return (Number(Input) > 9 ? Input : "0" + Input);
}
function SetTheTimer(Hour, Minute, Second){
    
    let TempDate = new Date();
    let HourSet = Number(TempDate.getHours()) + Number(Hour);
    let MinuteSet = Number(TempDate.getMinutes()) + Number(Minute);
    //timer seems to be delayed for what looks like memory processing reasons so add 2 secs to timer
    let SecondSet = Number(TempDate.getSeconds()) + Number(Second) + 2;

    CountDownTimer = new Date(TempDate.getFullYear(), TempDate.getMonth(), 
                TempDate.getDate(),HourSet,MinuteSet,SecondSet);

    DisplayTimeCountdown.subscribe(() => DisplayTimer());
}
function DisplayTimer(){
    let TimerToGetTo = CountDownTimer.getTime();
    let currentTime = (new Date()).getTime();

    let timerLeft = TimerToGetTo - currentTime;
    var hours = Math.floor((timerLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timerLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timerLeft % (1000 * 60)) / 1000);
    let TimeDisplayString = "";

    if (hours > 0){
        TimeDisplayString = TimeDisplayString + TestSingleDigit(hours) + ":";}

    if(minutes > 0){
        TimeDisplayString = TimeDisplayString + TestSingleDigit(minutes) + ":";}

    if(seconds > -1){
        TimeDisplayString = TimeDisplayString + TestSingleDigit(seconds);}

    TimerDiv.innerHTML = TimeDisplayString;
    if(timerLeft < 0){
        //clearInterval(DisplayTimeCountdown);
        TimerDiv.innerHTML = "Timer expired";
        StartTimer.disabled = false;
        DisplayTimeCountdown.unsubscribe();
    }
}