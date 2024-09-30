<?php

use App\Http\Controllers\ChefController;
use App\Http\Controllers\ChefFeedbackController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ManagerFeedbackController;
use App\Http\Controllers\StudentController;
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





Route::get('/CreateStudent', [StudentController::class, 'index']); // Get all students
Route::post('/CreateStudent', [StudentController::class, 'store']); // Create a new student
Route::get('/CreateStudent/{student}', [StudentController::class, 'show']); // Get a specific student by ID
Route::put('/CreateStudent/{student}', [StudentController::class, 'update']); // Update a specific student by ID
Route::delete('/CreateStudent/{student}', [StudentController::class, 'destroy']); // Delete a specific student by ID

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

Route::resource('/student' , StudentController::class);
Route::resource('/course' , CourseController::class);


// Route::apiResource('contactUs', ContactUsController::class);

// Route::get('/contactUs', [ContactUsController::class, 'index']);
Route::get('/contactUs/{contactUs}', [ContactUsController::class, 'show']);
Route::get('/contactUs', [ContactUsController::class, 'index']);




