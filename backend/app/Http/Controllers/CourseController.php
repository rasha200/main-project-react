<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\Chef;
use App\Models\Student;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        $courses = Course::with('chef', 'students')->get();
        return response()->json($courses);
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'course_name' => 'required|string|max:255',
            'course_description' => 'required|string',
            'course_start_date' => 'required|date',
            'course_end_date' => 'required|date|after:course_start_date', // Ensure end date is after start date
            'chef_id' => 'required|exists:chefs,id',
            'students' => 'array', // Expect an array of student IDs
            'students.*' => 'exists:students,id', // Each student ID should exist
        ]);

        // Create the course
        $course = Course::create($request->all());

        // Attach students to the course if provided
        if (isset($validatedData['students'])) {
            $course->students()->attach($validatedData['students']);
        }

        return response()->json($course->load('students'), 201);
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course)
    {
        return response()->json($course->load(['chef', 'students']));
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validatedData = $request->validate([
            'course_name' => 'sometimes|required|string|max:255',
            'course_description' => 'sometimes|required|string',
            'course_start_date' => 'sometimes|required|date',
            'course_end_date' => 'sometimes|required|date|after:course_start_date', // Ensure end date is after start date
            'chef_id' => 'sometimes|required|exists:chefs,id',
            'students' => 'array', // Students array is optional
            'students' => 'exists:students,id',
        ]);

        // Update the course details
        $course->update($validatedData);

        // Sync students if provided
        if (isset($validatedData['students'])) {
            $course->students()->sync($validatedData['students']);
        }

        return response()->json($course->load('students'));
    }

    /**
     * Remove the specified course from storage.
     */
    public function destroy(Course $course)
    {
        // Detach all students from the course before deleting
        $course->students()->detach();
        $course->delete();

        return response()->json(null, 204);
    }
}
