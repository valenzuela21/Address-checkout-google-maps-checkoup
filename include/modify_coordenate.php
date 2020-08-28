<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class addres_map_coordenate{

    function __construct()
    {
        add_action('wp_ajax_nopriv_pressing_send_map', array($this,'pressing_send_map' ));
        add_action('wp_ajax_pressing_send_map', array($this,'pressing_send_map'));

    }

    public function pressing_send_map() {

        $respuesta = $_POST['respuesta'];

        $data = array($respuesta[0], $respuesta[1]);

        WC()->session->set( 'coordenate_map' , $data );

    }


}
new addres_map_coordenate();



