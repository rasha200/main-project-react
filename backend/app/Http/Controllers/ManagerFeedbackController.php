<?php

namespace App\Http\Controllers;

use App\Models\ManagerFeedback; 
use Illuminate\Http\Request;

class ManagerFeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ManagerFeedback::with(['Maneger', 'chef'])->get()->map(function ($feedback) {
            return [
                'id' => $feedback->id,
                'feedback' => $feedback->feedback,
                'student_name' => $feedback->student->user->Fname	,  // No need for additional query
                'chef_name' => $feedback->chef->user->Fname . ' ' . $feedback->chef->user->Lname, 
            ];
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ManagerFeedback $manager_feedback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ManagerFeedback $manager_feedback) 
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ManagerFeedback $manager_feedback) 
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManagerFeedback $manager_feedback) 
    {
        //
    }
}
