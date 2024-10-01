<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\UserController;


use App\Http\Controllers\ChefController;



Route::get('courses', [CourseController::class, 'index']);
Route::post('courses', [CourseController::class, 'store']);
Route::get('courses/{id}', [CourseController::class, 'show']);
Route::put('courses/{course}', [CourseController::class, 'update']);
Route::delete('courses/{id}', [CourseController::class, 'destroy']);

// Assign students to a course
Route::post('courses/{id}/students', [CourseController::class, 'assignStudents']);

// Chef and Student Routes (optional depending on the requirement)
Route::get('chefs', [ChefController::class, 'index']);
Route::get('students', [StudentController::class, 'index']);




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
Route::post('/register', [AuthController ::class, 'register']);
Route::POST('/login', [AuthController::class, 'login']);


Route::resource('tasks', TaskController::class);

Route::resource('/student' , StudentController::class);
Route::resource('/course' , CourseController::class);


// Route::apiResource('contactUs', ContactUsController::class);

// Route::get('/contactUs', [ContactUsController::class, 'index']);
Route::get('/contactUs/{contactUs}', [ContactUsController::class, 'show']);
Route::get('/contactUs', [ContactUsController::class, 'index']);




