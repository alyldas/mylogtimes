if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
$.ajax({
    url: "https://www.toni-develops.com/external-files/examples/service-workers/delayed-response.php", success: function (result) {
        $("#container").html(result);
    }
});