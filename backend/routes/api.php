<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactUsController;


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



Route::post('/register', [AuthController ::class, 'register']);
Route::POST('/login', [AuthController::class, 'login']);


Route::resource('tasks', TaskController::class);

Route::resource('/student' , StudentController::class);
Route::resource('/course' , CourseController::class);


// Route::apiResource('contactUs', ContactUsController::class);

// Route::get('/contactUs', [ContactUsController::class, 'index']);
Route::get('/contactUs/{contactUs}', [ContactUsController::class, 'show']);
Route::get('/contactUs', [ContactUsController::class, 'index']);

