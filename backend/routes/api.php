<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\UserController;


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

Route::apiResource('events', EventController::class);

Route::get('profile/{id}', [StudentProfileController::class, 'show']);

Route::put('profile/{id}', [StudentProfileController::class, 'update']);

Route::get('/CreateUser', [UserController::class, 'index']);
Route::post('/CreateUser', [UserController::class, 'store']);
Route::put('/CreateUser/{id}', [UserController::class, 'update']);
Route::delete('/CreateUser/{id}', [UserController::class, 'destroy']);








