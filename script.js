console.log('v5');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });

        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification('Vibration Sample', {
                        body: 'Buzz! Buzz!',
                        icon: '../images/touch/chrome-touch-icon-192x192.png',
                        vibrate: [200, 100, 200, 100, 200, 100, 200],
                        tag: 'vibration-sample'
                    });
                });
            }
        });
    });
}
$.ajax({
    url: "https://www.toni-develops.com/external-files/examples/service-workers/delayed-response.php", success: function (result) {
        $("#container").html(result);
    }
});