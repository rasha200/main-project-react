<?php

use App\Http\Controllers\ChefController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Feedback routes

Route::get('feedback', [FeedbackController::class, 'index']); 
Route::get('feedback/{id}', [FeedbackController::class, 'show']); 
Route::post('feedback', [FeedbackController::class, 'store']); 
Route::put('feedback/{id}', [FeedbackController::class, 'update']); 
Route::delete('feedback/{id}', [FeedbackController::class, 'destroy']); 


// 
Route::apiResource('/chefs', ChefController::class);
Route::apiResource('/students', StudentController::class);
