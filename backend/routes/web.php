<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return new \Illuminate\Http\JsonResponse('Welcome to the API');
});


Route::get('/sanctum/csrf-cookie', [\Laravel\Sanctum\Http\Controllers\CsrfCookieController::class, 'show']);
