<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()

    {        
        return Student::with(['courses' , 'user'])->get();

               // return response()->json(Student::all());
    }

    public function store(Request $request)
{
     // Validate request data
    $validatedData = $request->validate([
        'parent_name' => 'required|string|max:255',
        'parent_number' => 'required|string|max:20',
        'id_img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'student_status' => 'required|in:Rejected,Confirmed,Pending',
        'user_id' => 'required|exists:users,id',
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
        // return response()->json($student);
        return response()->json($student->load('courses'));

    }

    public function update(Request $request, Student $student)
    {
        $validatedData = $request->validate([
         'parent_name' => 'sometimes|required|string|max:255',
            'parent_number' => 'sometimes|required|string|max:20',
            'id_img' => 'sometimes|required|string',
            'student_status' => 'sometimes|required|in:Rejected,Confirmed,Pending',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);
        $imagePath = null;


    if ($request->hasFile('id_img')) {
        $file = $request->file('id_img');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $path = public_path('././././uploads'); // check the path
        $file->move($path, $filename);


        $imagePath = '././././uploads' . $filename;
    }

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
       // $student->courses()->detach();

        $student->Delete();
        return response()->json([
            'message' => 'Student deleted successfully',
            'deleted_student' => $student
        ] , 201);
    }
}
