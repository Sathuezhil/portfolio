<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'ok' => true,
        'service' => 'sathuryan-portfolio-api',
    ]);
});

Route::get('/portfolio', PortfolioController::class);
Route::post('/contact', [ContactController::class, 'store']);
