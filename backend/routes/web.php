<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return new \Illuminate\Http\JsonResponse('Welcome to the API');
});
