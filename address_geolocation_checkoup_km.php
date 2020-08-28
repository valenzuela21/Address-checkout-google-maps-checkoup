<?php
/*
Plugin Name:  Geolocation Address Field Checkoup
Plugin URI:
Description:  This component is responsible for giving the address for the calculation of shipping in km.
Version:      1.0
Author:       David Fernando Valenzuela Pardo
Author URI:   https://creatives.com.co/
License:      GPL2
License URI:  https://creatives.com.co/
Text Domain:  geolocation-km
*/
define(_FILE_KM_PATH_, plugin_dir_path(__FILE__));

class KmGeolocalization
{

    function __construct()
    {
        add_action('init', array($this, 'require_file_include'));
        add_action('woocommerce_checkout_process', 'wp_ubicationValidateCheckoutFields');
        add_action('wp_enqueue_scripts', array($this, 'css_js_style'), 10, 1);
        add_action('woocommerce_after_checkout_billing_form', array($this, 'view_checkoup_hook_wocommerce'), 10);
        add_action('wp_enqueue_scripts', array($this, 'css_js_style'), 10, 1);
        add_filter('woocommerce_billing_fields', array($this, 'wpb_custom_billing_fields'));
        add_filter( 'woocommerce_default_address_fields' , array($this,'wp_add_field_input'),10, 2);
        add_filter('script_loader_tag', array($this,'add_asyncdefer_attribute'), 10, 2);

    }


    public function css_js_style()
    {
        if (is_checkout()) {
            $xbox = Xbox::get( 'config-address' );
            $key_google = $xbox->get_field_value( '_address_key_map' );
            $latitude = $xbox->get_field_value( '_address_coordenate_lat' );
            $longitude = $xbox->get_field_value( '_address_coordenate_lng' );
            $zoom = $xbox->get_field_value( '_address_zoom_map' );

            wp_enqueue_style('style_frond_check_input', plugins_url('./assets/css/style.css', __FILE__));
            wp_register_script('script_maps_checkout-defer', 'https://maps.googleapis.com/maps/api/js?key='.$key_google.'&callback=initMap&libraries=&v=weekly', array(), 1.0, false);
            wp_enqueue_script('script_map_checkout', plugins_url('./assets/js/script_map.js', __FILE__), array(), 1.0, true );

            wp_enqueue_script('script_map_general_checkout', plugins_url('./assets/js/script_general.js', __FILE__), array(), 1.0, true );
            wp_localize_script( 'script_map_general_checkout', 'my_ajax_object',
                array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );

            wp_enqueue_script('script_maps_checkout-defer');
            wp_localize_script( 'script_map_checkout', 'object_map',
                array(
                    'zoom' => $zoom,
                    'lat' => $latitude,
                    'lng' => $longitude,
                )
            );
        }else{
            WC()->session->__unset( 'coordenate_map');
            wp_enqueue_script('script_remove_storage', plugins_url('./assets/js/remover_storage.js', __FILE__), array(), 1.0, true );

        }
    }

    public function add_asyncdefer_attribute($tag, $handle) {
        // if the unique handle/name of the registered script has 'async' in it
        if (strpos($handle, 'async') !== false) {
            // return the tag with the async attribute
            return str_replace( '<script ', '<script async ', $tag );
        }
        // if the unique handle/name of the registered script has 'defer' in it
        else if (strpos($handle, 'defer') !== false) {
            // return the tag with the defer attribute
            return str_replace( '<script ', '<script defer ', $tag );
        }
        // otherwise skip
        else {
            return $tag;
        }
    }

    public function require_file_include()
    {
        require_once _FILE_KM_PATH_ . './include/form_billing_addres.php';
        require_once _FILE_KM_PATH_ . './include/calculate_distance.php';
        require_once _FILE_KM_PATH_ . './include/modify_coordenate.php';
        require_once _FILE_KM_PATH_ . './admin/xbox/xbox.php';
        require_once _FILE_KM_PATH_ . './admin/admin_config.php';
        require_once _FILE_KM_PATH_ . './admin/custom_inputs_admin.php';
    }

    public function view_checkoup_hook_wocommerce()
    {
        WC_Your_Shipping_Method::view_input_addres();
    }

    public function wpb_custom_billing_fields($fields)
    {
        unset($fields['billing_address_2']);
        unset($fields['billing_address_1']);
        unset($fields['shipping_address_1']);
        unset($fields['shipping_address_2']);
        unset($fields['shipping_city']);
        unset($fields['billing_city']);
        unset($fields['billing_state']);
        unset($fields['shipping_state']);
        unset($fields['billing_postcode']);
        return $fields;
    }

    public function wp_add_field_input( $fields ) {

        $fields['address']  = array(
            'label'        => __('Dirección: ', 'geolocation-km'),
            'required'     => true,
            'class'        => array( 'input-text', 'custom-text-class' ),
            'priority'     => 530,
            'placeholder'  => __('Ingresa la dirección', 'geolocation-km'),
        );

        return $fields;
    }


}

new KmGeolocalization();
