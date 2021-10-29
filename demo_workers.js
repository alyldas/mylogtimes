var i = 0;

self.onmessage = function (event) {
    postMessage('pong!');
};

function timedCount() {
    i = i + 1;
    localStorage.setItem("timeCount", i);
    postMessage(i);
    setTimeout("timedCount()", 500);
}

// timedCount();