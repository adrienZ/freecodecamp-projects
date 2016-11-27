var seconds = 0;
var minutes = 25;
var pomodoro;
var pause = true;
var remote = document.getElementById('remote');
var title = document.getElementsByTagName('h1')[0];

function minusOne() {
    seconds--;
    if (seconds == -1 && minutes > 0) {
        minutes--;
        seconds = 59;
        title.className = "";

    } else if (seconds <= 0 && minutes <= 0) {
        seconds = 0;
        title.className = "finish";
        setInterval(function () {
            show();
        }, 1000);
        stop();
    }


}

function show() {
    if (minutes >= 10) {
        if (seconds >= 10) {
            document.getElementById("numbers").innerHTML = "<p>" + minutes + " : " + seconds + "</p>";

        } else {
            document.getElementById("numbers").innerHTML = "<p>" + minutes + " : 0" + seconds + "</p>";

        }

    } else {
        if (seconds >= 10) {
            document.getElementById("numbers").innerHTML = "<p>0" + minutes + " : " + seconds + "</p>";

        } else {
            document.getElementById("numbers").innerHTML = "<p>0" + minutes + " : 0" + seconds + "</p>";

        }
    }
}

function stop() {
    clearInterval(pomodoro);
    pause = true;
    remote.innerHTML = "play";
}


function timer() {
    if (pause == true) {
        pomodoro = setInterval(function () {
            show();
            minusOne()
        }, 1000);
        remote.innerHTML = "pause";
        pause = false;
    } else {
        stop();
    }
    console.log(pause);
}




function reset() {
    stop();
    minutes = 0;
    seconds = 0;
    show();

}


function minPlus() {
    if (pomodoro) {
        stop();
    }
    minutes += 1;
    show();
    title.className = "";

}

function secPlus() {

    if (pomodoro) {
        stop();
    } else if (seconds == 50) {
        seconds = 0;
        seconds -= 10;
        minutes++;
    } else {
        seconds += 10;
        show();
    }
    title.className = "";

}

function minLess() {
    if (pomodoro) {
        stop();
    }
    if (minutes <= 0) {} else {
        minutes -= 1;
        show();
        title.className = "";


    }
}

function secLess() {
    if (pomodoro) {
        stop();
    }
    if (seconds <= 0) {
        minutes--;
        seconds = 50;
        show();
    }
        else if(seconds <= 10) {
           seconds=0;
        }
     else {
        seconds -= 10;
        show();
    }
    title.className = "";

}

function plusOne() {
    minutes++;
    title.className = "";
    show();
}








show();