<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactUsController;


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
Route::post('/register', [AuthController ::class, 'register']);
Route::POST('/login', [AuthController::class, 'login']);


Route::resource('tasks', TaskController::class);

Route::resource('/student' , StudentController::class);
Route::resource('/course' , CourseController::class);


// Route::apiResource('contactUs', ContactUsController::class);

// Route::get('/contactUs', [ContactUsController::class, 'index']);
Route::get('/contactUs/{contactUs}', [ContactUsController::class, 'show']);
Route::get('/contactUs', [ContactUsController::class, 'index']);

