<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Chef;
use Illuminate\Http\Request;


class ChefController extends Controller
{
    public function index()
    {
        return response()->json(Chef::with('user')->get());
    }
    

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'chef_description' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        $chef = Chef::create($validatedData);

        return response()->json($chef, 201);
    }

    public function show(Chef $chef)
    {
        return response()->json($chef);
    }

    public function update(Request $request, Chef $chef)
    {
        $validatedData = $request->validate([
            'chef_description' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        $chef->update($validatedData);

        return response()->json($chef);
    }

    public function destroy(Chef $chef)
    {
        $chef->delete();

        return response()->json(null, 204);
    }
}



    
   

   
 
