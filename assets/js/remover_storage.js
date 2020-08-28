(function () {
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        localStorage.removeItem("address_bill");
        localStorage.removeItem("coordinates-address");
    } else {
        alert("¡Este componenete Geolocation Address Field Checkoup no es compatible con este navegador!")
    }
})()