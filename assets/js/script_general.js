(function ($) {

    if (typeof (Storage) !== "undefined") {
        let billing_address = localStorage.getItem("address_bill")
        $("#billing_address").val(billing_address);
    }


    $('#billing_address').change(function (e) {
        e.preventDefault();

        let billing_address = $("#billing_address").val();

        if(billing_address === ""){
            return;
        }
        // Check browser support
        if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("address_bill", billing_address);
            // Retrieve
            $("#billing_address").val(localStorage.getItem("address_bill"));
        } else {
            alert("¡Alerta: Este navegador no soporta este sistema de pago!")
        }


        setTimeout(function () {
            let lat = $("#latitude").val();
            let lng = $("#longitude").val();
            let coordinates = [lat, lng];

            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("coordinates-address", coordinates);
            } else {
                alert();
                return;
            }

            let respuestas = [lat, lng];

            let datos = {
                action: 'pressing_send_map',
                respuesta: respuestas
            }

            $.ajax({
                url: my_ajax_object.ajax_url,
                type: 'post',
                data: datos
            }).done(function (respuesta) {
                $('body').trigger('update_checkout');
            });


        }, 1000);

    })


})(jQuery);