"use strict";

function initMap() {

    let _myLatLng, map;

    let _coordinates = localStorage.getItem("coordinates-address");

    if (_coordinates != undefined && _coordinates != null && _coordinates != "") {

        _coordinates = _coordinates.split(",");

        _myLatLng = {
            lat: parseFloat(_coordinates[0]),
            lng: parseFloat(_coordinates[1])
        };

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: parseInt(object_map.zoom),
            center: _myLatLng
        });


        new google.maps.Marker({
            position: _myLatLng,
            map,
        });

    } else {

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: parseInt(object_map.zoom),
            center:{
                lat: parseFloat(object_map.lat),
                lng: parseFloat(object_map.lng)
            }
        });


    }


    const geocoder = new google.maps.Geocoder();

    document.getElementById("billing_address").addEventListener("change", () => {

        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {

    const address = document.getElementById("billing_address").value;
    const city = document.getElementById("billing_country").value;
    let citys;

    switch (city) {
        case 'AF':
            citys = 'Afganistan';
            break;
        case 'AX':
            citys = 'Islas Aland';
            break;
        case 'AL':
            citys = 'Albania';
            break;
        case 'DZ':
            citys = 'Argelia';
            break;
        case 'AS':
            citys = 'Samoa Americana';
            break;
        case 'MN':
            citys = 'Mongolia';
            break;
        case 'NI':
            citys = 'Nigeria';
            break;
        case 'AD':
            citys = 'Andorra';
            break;
        case 'AO':
            citys = 'Angola';
            break;
        case 'AI':
            citys = 'Anguila';
            break;
        case 'AQ':
            citys = 'Antartida';
            break;
        case 'AG':
            citys = 'Antigua y Barbuda';
            break;
        case 'AR':
            citys = 'Argentina';
            break;
        case 'AM':
            citys = 'Armenia';
            break;
        case 'AW':
            citys = 'Aruba';
            break;
        case 'AU':
            citys = 'Australia';
            break;
        case 'AT':
            citys = 'Austria';
        case 'AZ':
            citys = 'Azerbaiyan';
            break;
        case 'BS':
            citys = 'Bahamas';
        case 'BH':
            citys = 'Barein';
        case 'BD':
            citys = 'Bangladesh';
        case 'BB':
            citys = 'Barbados';
            break;
        case 'BY':
            citys = 'Bielorrusia';
            break;
        case 'BE':
            citys = 'Belgica';
            break
        case 'BZ':
            citys = 'Belice';
            break;
        case 'BJ':
            citys = 'Benin';
            break;
        case 'BM':
            citys = 'Bermuda';
            break;
        case 'BO':
            citys = 'Bolivia';
            break;
        case 'VN':
            citys = 'Vietnam';
            break;
        case 'BN':
            citys = 'Brunei';
            break;
        case 'CY':
            citys = 'Chipre';
            break;
        case 'BQ':
            citys = 'Bonaire, San Eustaquia';
            break;
        case 'BA':
            citys = 'Bonia y Herzegovina';
            break;
        case 'BW':
            citys = 'Botsuana';
            break;
        case 'BV':
            citys = 'Isla Bouvet';
            break;
        case 'BR':
            citys = 'Brasil';
            break;
        case 'IO':
            citys = 'Territorio Britanico';
            break;
        case 'VG':
            citys = 'Islas Virgenes Britanicas';
            break;
        case 'BN':
            citys = 'Brunei';
            break;
        case 'BG':
            citys = 'Bulgaria';
            break;
        case 'BF':
            citys = 'Burkina Faso';
            break;
        case 'BL':
            citys = 'Burundi';
            break;
        case 'KH':
            citys = 'Camboya';
            break;
        case 'CM':
            citys = 'Camerun';
            break;
        case 'CA':
            citys = 'Canada';
            break;
        case 'CV':
            citys = 'Cabo Verde';
            break;
        case 'KY':
            citys = 'Islas Caiman';
            break;
        case 'CF':
            citys = 'Islas Caiman';
            break;
        case 'TD':
            citys = 'Chad';
            break;
        case 'CL':
            citys = 'Chile';
            break;
        case 'CN':
            citys = 'China';
            break;
        case 'CX':
            citys = "Isla Pascua";
            break;
        case 'CC':
            citys = "Islas Cocos";
            break;
        case 'CO':
            citys = "Colombia";
            break;
        case 'KM':
            citys = "Comoras"
            break;
        case 'CK':
            citys = "Islas Cook";
            break;
        case  'CR':
            citys = "Costa Rica";
            break;
        case 'HR':
            citys = "Croacia";
            break;
        case 'CU':
            citys = "Cuba";
            break;
        case 'CW':
            citys = "Curazado";
            break;
        case "CY":
            citys = "Chipre";
            break;
        case "CZ":
            citys = "Republica Checa";
            break;
        case "CD":
            citys = "Republica Dominicana";
            break;
        case "DK":
            citys = "Dinamarca";
            break;
        case "DJ":
            citys = "Yibuti";
            break;
        case "DM":
            citys = "Dominica";
            break;
        case "DO":
            citys = "Republic Dominica";
            break;
        case "TL":
            citys = "Timor Oriental";
            break;
        case "EC":
            citys = "Ecuador";
            break;
        case "EG":
            citys = "Egipto";
            break;
        case "SV":
            citys = "El Salavador";
            break;
        case "GB":
            citys = "Reino Unido";
            break;
        case "GQ":
            citys = "Guinea Ecuatorial";
            break;
        case "ER":
            citys = "Eritrea";
            break;
        case "EE":
            citys = "Estonia";
            break;
        case "ET":
            citys = "Etiopia";
            break;
        case "US":
            citys = "Estados Unidos";
            break;
        case "UY":
            citys = "Uruguay";
            break;
        case "VE":
            citys = "Venezuela";
            break;
        case "UA":
            citys = "Ucrania";
            break;
        case "TW":
            citys = "Taiwan";
            break;
        case "ES":
            citys = "España";
            break;
        case "KR":
            citys = "Korea Sur";
            break;
        case "ZA":
            citys = "Sudafrica";
            break;
        case "RS":
            citys = "Serbia";
            break;
        case "PR":
            citys = "Puerto Rico";
            break;
        case "PT":
            citys = "Portugal";
            break;
        case "PL":
            citys = "Polonia";
            break;
        case "PE":
            citys = "Peru";
            break;
        case "RW":
            citys = "Ruanda";
            break;
        case "SN":
            citys = "Senegal";
            break;
        case "PA":
            citys = "Panama";
            break;
        case "NZ":
            citys = "Nueva Zelanda";
            break;
        case "NC":
            citys = "Nueva Caledonia";
            break;
        case "MA":
            citys = "Marruecos";
            break;
        case "MX":
            citys = "Mexico";
            break;
        case "MY":
            citys = "Malasia";
            break;
        case "LT":
            citys = "Lituana";
            break;
        case "JP":
            citys = "Japon";
            break;
        case "IT":
            citys = "Italia"
            break;
        case "IL":
            citys = "Israel";
            break;
        case "CL":
            citys = "Costa Marfil";
            break;
        case "PH":
            citys = "Filipinas";
            break;
        case "ID":
            citys = "Indonesia";
            break;
        case "IN":
            citys = "India";
            break;
        case "IR":
            citys = "Iran";
            break;
        case "IQ":
            citys = "Irak";
            break;
        case "HU":
            citys = "Hungria";
            break;
        case "HO":
            citys = "Honduras";
            break;
        case "JM":
            citys = "Jamaica";
            break;
        case "GT":
            citys = "Guatemala";
            break;
        case "GR":
            citys = "Grecia";
            break;
        case "DE":
            citys = "Alemania";
            break;
        case "OM":
            citys = "Oman";
            break;
        case "FR":
            citys = "Francia";
            break;
        case "FI":
            citys = "Filandia";
            break;
        case "EE":
            citys = "Estonia";
            break;
        case "SV":
            citys = "El Salvador";
            break;
        case "Egipto":
            citys = "Egipto";
            break;
        case "EC":
            citys = "Ecuador";
            break;
        case "DK":
            citys = "Dinamarca";
            break;
        case "CU":
            citys = "Cuba";
            break;
        case "NO":
            citys = "Noruega";
            break;
        case "SG":
            citys = "Singapur";
            break;
        case "CH":
            citys = "Suiza";
            break;
        case "SE":
            citys = "Suecia";
            break;
        case "KR":
            citys = "Corea Sur";
            break;
        case "KP":
            citys = "Corea Norte";
            break;
        case "FR":
            citys = "Francia";
            break;
        case "GM":
            citys = "Gambia";
            break;
        case "GR":
            citys = "Gibraltar";
            break;
        case "PY":
            citys = "Paraguay";
            break;
        case "QA":
            citys = "Catar";
            break;
        case "RO":
            citys = "Rumania";
            break;
        case "RU":
            citys = "Rusia";
            break;
        case "VA":
            citys = "Vaticano";
            break;
        case "ZM":
            citys = "Zambia";
            break;
        case "GN":
            citys = "Guinea";
            break;
        case "HT":
            citys = "Haiti";
            break;
        case "JM":
            citys = "Jamaica";
            break;
        case "MT":
            citys = "Malta";
            break;
        case "ML":
            citys = "Mali";
            break;
        case "GE":
            citys = "Georgia";
            break;
        case "NL":
            citys = "Paises Bajos";
            break;
        default:
            citys = " ";

    }

    geocoder.geocode(
        {
            address: address + ' ' + citys
        },
        (results, status) => {
            if (status === "OK") {
                resultsMap.setCenter(results[0].geometry.location);

                document.getElementById('latitude').value = results[0].geometry.location.lat();
                document.getElementById('longitude').value = results[0].geometry.location.lng();

                const marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });

            } else {
                alert(
                    "Geocode was not successful for the following reason: " + status
                );
            }
        }
    );

}
