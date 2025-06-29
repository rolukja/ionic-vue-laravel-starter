<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        // Entwicklungsumgebung
        'http://localhost:8100',
        'http://127.0.0.1:8100',
        'http://localhost:3000',
        'http://localhost:8080',
        'http://192.168.178.22:8100',  // Für mobile Geräte im lokalen Netzwerk
        
        // Capacitor/Ionic Mobile App
        'capacitor://localhost',
        'ionic://localhost',
        'http://localhost',
        'https://localhost',
        
        // Produktionsumgebung
        'http://v2202505272384340111.bestsrv.de:85',
        'http://46.232.248.112:85',
        'http://myapp.de',
    ],

    'allowed_origins_patterns' => [
        // Nur für Entwicklung/Testing - NICHT für Produktion verwenden!
        // '/^capacitor:\/\/.*/',
        // '/^ionic:\/\/.*/',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
