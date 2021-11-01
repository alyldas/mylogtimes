// var i = 0;
const url = 'https://www.cloudflare.com/cdn-cgi/trace';

function timedCount() {
    // i = i + 1;
    fetch(url)
        .then(response => response.text())
        .then(response => response.split(/\n/g))
        .then(response => response.reduce((obj, line) => {
            const cols = line.split('=');
            obj[cols[0]] = cols[1];
            return obj;
        }, {}))
        .then(result => {
            // console.log('Success:', result);
            postMessage(result['ip']);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    setTimeout("timedCount()", 1000);
}

timedCount();
