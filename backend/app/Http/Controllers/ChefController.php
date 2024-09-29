<?php

namespace App\Http\Controllers;

use App\Models\Chef;
use Illuminate\Http\Request;

class ChefController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Chef::all());
    }

   
    
    public function store(Request $request)
    {

    chef::create([
        'chef_description' => $request->chef_description,
        'user_id' => $request->user_id,
    ]);

    return response()->json([
        'message' => 'Chef created successfully'
    ] , 201);


    }

    /**
     * Display the specified resource.
     */
    public function show(Chef $chef)
    {
        return response()->json($chef);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chef $chef)
    {

    $chef->update([
        'chef_description' => $request->chef_description,
    ]);

    return response()->json([
        'message' => 'Chef updated successfully',
        'updated_chef' => $chef,
    ] , 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chef $chef)
    {
        $chef->Delete();

        return response()->json([
            'message' => 'Chef deleted successfully',
            'deleted_chef' => $chef,
        ] , 201);
    }
}
