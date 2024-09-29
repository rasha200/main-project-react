<?php
namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Student;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    // Get all feedback (READ)
    public function index()
    {
        return Feedback::with(['student', 'chef'])->get()->map(function ($feedback) {
            return [
                'id' => $feedback->id,
                'feedback' => $feedback->feedback,
                'student_name' => $feedback->student->user->Fname	,  // No need for additional query
                'chef_name' => $feedback->chef->user->Fname . ' ' . $feedback->chef->user->Lname, 
            ];
        });
    }
    
    

    public function show($id)
    {
        $feedback = Feedback::with(['student', 'chef'])->findOrFail($id);
        return [
            'id' => $feedback->id,
            'feedback' => $feedback->feedback,
            'student_name' => $feedback->student->Fname . ' ' . $feedback->student->Lname, 
            'chef_name' => $feedback->chef->Fname . ' ' . $feedback->chef->Lname,
        ];
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'feedback' => 'required|string',
            'student_id' => 'required|exists:students,id',
            'chef_id' => 'required|exists:chefs,id',
        ]);

        $feedback = Feedback::create($validatedData);

        return response()->json([
            'message' => 'Feedback created successfully',
            'data' => [
                'feedback' => $feedback->feedback,
                'student_name' => $feedback->student->Fname . ' ' . $feedback->student->Lname,
                'chef_name' => $feedback->chef->Fname . ' ' . $feedback->chef->Lname,
            ]
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'feedback' => 'required|string',
            'student_id' => 'required|exists:students,id',
            'chef_id' => 'required|exists:chefs,id',
        ]);

        $feedback = Feedback::findOrFail($id);
        $feedback->update($validatedData);

        return response()->json([
            'message' => 'Feedback updated successfully',
            'data' => [
                'feedback' => $feedback->feedback,
                'student_name' => $feedback->student->Fname . ' ' . $feedback->student->Lname,
                'chef_name' => $feedback->chef->Fname . ' ' . $feedback->chef->Lname,
            ]
        ], 200);
    }

    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return response()->json(null, 204);
    }
}
