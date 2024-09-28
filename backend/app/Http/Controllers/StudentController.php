<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()

    {        
        return Student::with('courses')->get();

       
        // return response()->json(Student::all());
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validatedData = $request->validate([
            'parent_name' => 'required|string|max:255',
            'parent_number' => 'required|string|max:20',
            'id_img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'student_status' => 'required|in:Rejected,Confirmed,Pending',
            'user_id' => 'required|exists:users,id',
        ]);

        $imagePath = null;

   
    if ($request->hasFile('id_img')) {
        $file = $request->file('id_img');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $path = public_path('././././uploads'); // check the path
        $file->move($path, $filename);

       
        $imagePath = '././././uploads' . $filename;
    }


    Student::create([
        'parent_name' => $validatedData->parent_name,
        'parent_number' => $validatedData->parent_number,
        'id_img' => $validatedData->id_img,
        'status' => $validatedData->status,
        'user_id' => $request->user_id,
    ]);

    return response()->json([
        'message' => 'Student created successfully'
    ] , 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        // return response()->json($student);
        return response()->json($student->load('courses'));

    }


    /**
     * Update the specified resource in storage.
     */
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
        'parent_name' => $validatedData->parent_name,
        'parent_number' => $validatedData->parent_number,
        'id_img' => $validatedData->id_img,
        'student_status' => $validatedData->status,
    ]);

    return response()->json([
        'message' => 'Student updated successfully',
        'updated_student' => $student
    ] , 201);
    }

    /**
     * Remove the specified resource from storage.
     */
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
