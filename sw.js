self.addEventListener('activate', function (event) {
    var i = 0;

    function timedCount() {
        i = i + 1;
        console.log(i);
        setTimeout("timedCount()", 500);
    }

    timedCount();
});