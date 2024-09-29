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
        $validatedData = $request->validate([
            'parent_name' => 'required|string|max:255',
            'parent_number' => 'required|string|max:255',
            'id_img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:Rejected,Confirmed,Pending', // Ensure status matches enum values
            'user_id' => 'required|exists:users,id',
        ]);

        $imagePath = $this->handleFileUpload($request);

        // Create student record
        $student = Student::create([
            'parent_name' => $validatedData['parent_name'],
            'parent_number' => $validatedData['parent_number'],
            'id_img' => $imagePath,
            'status' => $validatedData['status'],
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
        $student->delete();
        return response()->json(['message' => 'Student deleted successfully'], 204);
    }

    private function handleFileUpload($request)
    {
        if ($request->hasFile('id_img')) {
            $file = $request->file('id_img');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = public_path('./uploads');
            $file->move($path, $filename);
            return './uploads/' . $filename;
        }
        return null;
    }
}
