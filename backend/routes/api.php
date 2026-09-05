<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminContentController;
use App\Http\Controllers\Api\AdminMessageController;
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

Route::post('/admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:8,1');

Route::middleware('admin')->prefix('admin')->group(function () {
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);
    Route::get('/messages', [AdminMessageController::class, 'index']);
    Route::patch('/messages/{id}/read', [AdminMessageController::class, 'markRead']);
    Route::delete('/messages/{id}', [AdminMessageController::class, 'destroy']);
    Route::get('/content', [AdminContentController::class, 'show']);
    Route::put('/content', [AdminContentController::class, 'update']);
});
