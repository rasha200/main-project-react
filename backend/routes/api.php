<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ChefController;
use App\Http\Controllers\StudentController;



Route::get('courses', [CourseController::class, 'index']);
Route::post('courses', [CourseController::class, 'store']);
Route::get('courses/{id}', [CourseController::class, 'show']);
Route::put('courses/{id}', [CourseController::class, 'update']);
Route::delete('courses/{id}', [CourseController::class, 'destroy']);

// Assign students to a course
Route::post('courses/{id}/students', [CourseController::class, 'assignStudents']);

// Chef and Student Routes (optional depending on the requirement)
Route::get('chefs', [ChefController::class, 'index']);
Route::get('students', [StudentController::class, 'index']);



