document.write('v4');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').then(function (registration) {
            // Registration was successful
            document.write('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            document.write('ServiceWorker registration failed: ', err);
        });
    });
}
$.ajax({
    url: "https://www.toni-develops.com/external-files/examples/service-workers/delayed-response.php", success: function (result) {
        $("#container").html(result);
    }
});