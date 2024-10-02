<?php

namespace App\Http\Controllers;

use App\Models\ManagerFeedback; 
use Illuminate\Http\Request;

class ManagerFeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     return ManagerFeedback::with(['Maneger', 'chef','user'])->get()->map(function ($feedback) {
    //         return [
    //             'id' => $feedback->id,
    //             'feedback' => $feedback->feedback,
    //             'manager_name' => $feedback->manager->user->Fname . ' ' . $feedback->manager->user->Lname, 
    //             'supervisor_name' => $feedback->supervisor->user->Fname	,  
    //             'chef_name' => $feedback->chef->user->Fname . ' ' . $feedback->chef->user->Lname, 
    //         ];
    //     });
    // }







    public function index()
    {
        return ManagerFeedback::with(['manager', 'chef', 'supervisor'])->get()->map(function ($feedback) {
            return [
                'id' => $feedback->id,
                'feedback' => $feedback->feedback,
                'manager_name' => optional($feedback->manager->user)->Fname . ' ' . optional($feedback->manager->user)->Lname, 
                'supervisor_name' => optional($feedback->supervisor->user)->Fname,  
                'chef_name' => optional($feedback->chef->user)->Fname . ' ' . optional($feedback->chef->user)->Lname, 
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
