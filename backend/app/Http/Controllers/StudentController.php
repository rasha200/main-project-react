<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(Student::all());
    }

    public function store(Request $request)
{
    // Validate request data
    $validatedData = $request->validate([
        'parent_name' => 'required|string|max:255',
        'parent_number' => 'required|string|max:255',
        'id_img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'student_status' => 'required',
        'user_id' => 'required|exists:users,id', // Ensure user exists
    ]);

    // Handle image upload if present
    $imagePath = null;
    if ($request->hasFile('id_img')) {
        $file = $request->file('id_img');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $path = public_path('uploads');
        $file->move($path, $filename);
        $imagePath = 'uploads/' . $filename;
    }

    // Create a student record
    $student = Student::create([
        'parent_name' => $validatedData['parent_name'],
        'parent_number' => $validatedData['parent_number'],
        'id_img' => $imagePath, // Save the uploaded image path
        'status' => $validatedData['student_status'],
        'user_id' => $validatedData['user_id'],
    ]);

    return response()->json(['message' => 'Student created successfully', 'student' => $student], 201);
}

    public function show(Student $student)
    {
        return response()->json($student);
    }

    public function update(Request $request, Student $student)
    {
        $validatedData = $request->validate([
            'parent_name' => 'required|string|max:255',
            'parent_number' => 'required|string|max:255',
            'id_img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:Rejected,Confirmed,Pending', // Ensure status matches enum values
        ]);

        $imagePath = $this->handleFileUpload($request);

        // Update student record
        $student->update([
            'parent_name' => $validatedData['parent_name'],
            'parent_number' => $validatedData['parent_number'],
            'id_img' => $imagePath,
            'status' => $validatedData['status'],
        ]);

        return response()->json(['message' => 'Student updated successfully', 'updated_student' => $student], 200);
    }

    public function destroy(Student $student)
    {
        // $student->detach()
        $student->Delete();
        return response()->json([
            'message' => 'Student deleted successfully',
            'deleted_student' => $student
        ] 
           , 201);
    }
}
