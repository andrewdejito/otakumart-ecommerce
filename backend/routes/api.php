<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// PUBLIC ROUTES
Route::middleware('api')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);           
    Route::post('/cart', [CartController::class, 'store']);          
    Route::put('/cart/{productId}', [CartController::class, 'update']); 
    Route::delete('/cart/{productId}', [CartController::class, 'destroy']);
});

// Public product/catalog routes (users don't need login to view)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

// AUTHENTICATED ROUTES
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // ADMIN ROUTES
    Route::middleware('admin')->group(function () {
        
        // Full CRUD for admin
        Route::apiResource('/admin/products', ProductController::class);
        Route::apiResource('/admin/categories', CategoryController::class);

        Route::get('/admin/dashboard', function () {
            return "Welcome Admin!";
        });
    });

});
