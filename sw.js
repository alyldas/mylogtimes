var i = 0;

function timedCount() {
    i = i + 1;
    console.log(i);
    setTimeout("timedCount()", 500);
}

self.addEventListener('activate', function (event) {
    timedCount();
});