<?php

use App\Http\Controllers\ChefController;
use App\Http\Controllers\ChefFeedbackController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ManagerFeedbackController;
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

Route::get('feedback', [ChefFeedbackController::class, 'index']); 
Route::get('feedback/{id}', [ChefFeedbackController::class, 'show']); 
Route::post('feedback', [ChefFeedbackController::class, 'store']); 
Route::put('feedback/{id}', [ChefFeedbackController::class, 'update']); 
Route::delete('feedback/{id}', [ChefFeedbackController::class, 'destroy']); 


// 
Route::apiResource('/chefs', ChefController::class);
Route::apiResource('/students', StudentController::class);

//////////////////////////////////


Route::get('feedbackManeger', [ManagerFeedbackController::class, 'index']); 
Route::get('feedbackManeger/{id}', [ManagerFeedbackController::class, 'show']); 
Route::post('feedbackManeger', [ManagerFeedbackController::class, 'store']); 
Route::put('feedbackManeger/{id}', [ManagerFeedbackController::class, 'update']); 
Route::delete('feedbackManeger/{id}', [ManagerFeedbackController::class, 'destroy']); 
