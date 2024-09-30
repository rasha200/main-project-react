<?php
namespace App\Http\Controllers;


use App\Models\ChefFeedback;
use App\Models\Student;
use Illuminate\Http\Request;

class ChefFeedbackController extends Controller
{
    // Get all feedback (READ)
    public function index()
    {
        return ChefFeedback::with(['student', 'chef'])->get()->map(function ($feedback) {
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
        $feedback = ChefFeedback::with(['student', 'chef'])->findOrFail($id);
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

        $feedback = ChefFeedback::create($validatedData);

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
        // Validate incoming request data
        $validatedData = $request->validate([
            'feedback' => 'required|string',
            'student_id' => 'required|exists:students,id',
            'chef_id' => 'required|exists:chefs,id',
        ]);
    
        // Find the feedback record and eager load related student and chef
        $feedback = ChefFeedback::with(['student', 'chef','user'])->findOrFail($id);
    
        // Update the feedback with validated data
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
        $feedback = ChefFeedback::findOrFail($id);
        $feedback->delete();
        return response()->json(null, 204);
    }
}
