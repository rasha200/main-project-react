<?php

namespace App\Http\Controllers;

use App\Models\testimonials;
use Illuminate\Http\Request;

class TestimonialsController extends Controller
{
    
    public function index()
    {
        $testimonials = testimonials::with('user:id,Fname,Lname')->get();
        return response()->json($testimonials);
        // return response()->json(testimonials::all());
    }





    public function store(Request $request)
    {
        testimonials::create([
            'message' => $request->contact_subject,
            'user_id' => $request->user_id,
        ]);
    
        return response()->json([
            'message' => 'Testimonials created successfully'
        ] , 201);
    }



    

    public function show(testimonials $testimonials)
    {
        return response()->json([
            "testimonials" => $testimonials,
            "status" => 200,
        ],200);
    }

    



    public function destroy(testimonials $testimonials)
    {
        $testimonials->Delete();

        return response()->json([
            'message' => 'Testimonials deleted successfully'
        ] , 201);
    }
}
