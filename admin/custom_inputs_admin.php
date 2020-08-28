<?php

class inputCustom{

    function __construct()
    {
        add_action( 'woocommerce_admin_order_data_after_shipping_address', array($this,'my_custom_checkout_field_display_admin_order_meta'), 10, 1 );
        add_action( "woocommerce_email_customer_details", array($this,"custom_woocommerce_email_after_order_table"), 10, 1);
        add_action( 'woocommerce_thankyou', array($this,'custom_thank_page_address'), 5, 30 );

    }

    public function my_custom_checkout_field_display_admin_order_meta(){
        global $post_id;
        $order = new WC_Order( $post_id );

        echo '<p><strong>'.__('Dirección Envio:', 'geolocation-km').'</strong> ' . get_post_meta($order->get_id(), '_billing_address', true ) . '</p>';
    }

    public function custom_woocommerce_email_after_order_table( $order ) {

        echo '
            <h2>'.__('Detalles Envio','geolocation-km').'</h2>
            <p><strong>'.__('Dirección: ','geolocation-km').'</strong>'. get_post_meta( $order->id, '_billing_address', true ) .'</p>
            ';

    }


    function custom_thank_page_address($order) {
        echo "<p>Dirección de envio: ".get_post_meta( $order, '_billing_address', true ) ." </p>";
    }


}
new inputCustom();
