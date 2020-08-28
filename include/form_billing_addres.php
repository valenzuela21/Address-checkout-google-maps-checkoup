<?php

if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {

    function your_shipping_method_init()
    {
        if (!class_exists('WC_Your_Shipping_Method')) {
            class WC_Your_Shipping_Method extends WC_Shipping_Method
            {
                /**
                 * Constructor for your shipping class
                 *
                 * @access public
                 * @return void
                 */
                public function __construct()
                {

                    $xbox = Xbox::get('config-address');
                    $title = $xbox->get_field_value('_address_title_send');
                    $active = $xbox->get_field_value(' _active_complement');
                    $this->id = 'config-address-payment-wp'; // Id for your shipping method. Should be uunique.
                    $this->method_title = __('Envio Personalizado', 'geolocation-km');  // Title shown in admin
                    $this->method_description = __('Hola!, Deseas que este componente ralicé el costo del envio. Si aceptas dale guardar o salvar cambios.', 'geolocation-km'); // Description shown in admin

                    $active == "on"? $state = "yes": $state = "";

                    $this->enabled = "yes"; // This can be added as an setting but for this example its forced enabled
                    $this->title = $title; // This can be added as an setting but for this example its forced.

                    $this->init();
                }

                /**
                 * Init your settings
                 *
                 * @access public
                 * @return void
                 */
                function init()
                {
                    // Load the settings API
                    $this->init_form_fields(); // This is part of the settings API. Override the method to add your own settings
                    $this->init_settings(); // This is part of the settings API. Loads settings you previously init.
                    // Save settings in admin if you have any defined
                    add_action('woocommerce_update_options_shipping_' . $this->id, array($this, 'process_admin_options'));

                }


                /**
                 * calculate_shipping function.
                 *
                 * @access public
                 * @param mixed $package
                 * @return void
                 */

                public function calculate_shipping($package)
                {

                    $rate = array(
                        'label' => $this->title,
                        'cost' => self::address_new_value(),
                        'calc_tax' => 'per_item'
                    );

                    // Register the rate
                    $this->add_rate($rate);


                }

                public static function view_input_addres()
                {   // Calculate totals
                    //WC()->cart->calculate_shipping();

                    ?>
                    <div>
                        <div id="map"></div>
                        <input style="display: none" type="text" id="latitude"/>
                        <input style="display: none" type="text" id="longitude"/>
                    </div>
                    <?php
                }

                public static function address_new_value()
                {

                    $xbox = Xbox::get('config-address');
                    $lat1 = $xbox->get_field_value('_address_coordenate_lat');
                    $lon1 = $xbox->get_field_value('_address_coordenate_lng');
                    $pressing_send = $xbox->get_field_value('_address_pressing_send');
                    $unidad = "K";

                    $session_data = WC()->session->get('coordenate_map');
                    $lat2 = $session_data[0];
                    $lon2 = $session_data[1];

                    $distance = distanceCalculate::distance($lat1, $lon1, $lat2, $lon2, $unidad);
                    $total_send = ceil($distance) * $pressing_send;
                    /*ceil($distance)."Km * ". wc_price($pressing_send ). " = ".wc_price($total_send);*/

                    if (empty($session_data[0]) || empty($session_data[1])) {
                        $value = 0;
                    } else {
                        $value = $total_send;
                    }

                    return $value;

                }


            }
        }
    }

    add_action('woocommerce_shipping_init', 'your_shipping_method_init');

    function add_your_shipping_method($methods)
    {
        $methods['payment-shopping-send'] = 'WC_Your_Shipping_Method';
        return $methods;
    }

    add_filter('woocommerce_shipping_methods', 'add_your_shipping_method');
}
