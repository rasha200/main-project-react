<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Chef;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ChefController extends Controller
{
    public function index()
    {
        return response()->json(Chef::with('user')->get());
    }
    

    public function store(Request $request)
    {
         // Validation for both user and student data
         $validator = Validator::make($request->all(), [
            'Fname' => 'required|string|max:255',
            'Lname' => 'required|string|max:255',
            'user_email' => 'required|string|email|max:255|unique:users',
            'user_password' => 'required|string|min:6',
            'user_number' => 'required|string|max:15',
            'user_age' => 'required|integer',
            'user_gender' => 'required|in:Male,Female',
            'chef_description' => 'required|string',
           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'Fname' => $request->Fname,
            'Lname' => $request->Lname,
            'user_email' => $request->user_email,
            'user_password' => $request->user_password,
            'user_number' => $request->user_number,
            'user_age' => $request->user_age,
            'user_gender' => $request->user_gender,
        ]);

        // Create the chef linked to the user
        $chef = Chef::create([
            'chef_description' => $request->chef_description,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'user chef created successfully!',
            'user' => $user,
            'student' => $chef,
        ], 200);


        return response()->json($chef, 201);
    }

    public function show(Chef $chef)
    {
        return response()->json($chef);
    }

    public function update(Request $request, Chef $chef)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'Fname' => 'required|string|max:255',
            'Lname' => 'required|string|max:255',
            'user_email' => 'required|string|email|max:255|unique:users,user_email,' . $chef->user->id,
            'user_password' => 'nullable|string|min:6',
            'user_number' => 'required|string|max:15',
            'user_age' => 'required|integer',
            'user_gender' => 'required|in:Male,Female',
            'chef_description' => 'required|string',
        ]);
    
        // Return validation errors if they exist
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Fetch the user associated with this chef
        $user = $chef->user;
    
        // Update user details
        $user->update([
            'Fname' => $request->Fname,
            'Lname' => $request->Lname,
            'user_email' => $request->user_email,
            'user_number' => $request->user_number,
            'user_age' => $request->user_age,
            'user_gender' => $request->user_gender,
            // Only update the password if a new one is provided
            'user_password' => $request->user_password ? bcrypt($request->user_password) : $user->user_password,
        ]);
    
        // Update chef details
        $chef->update([
            'chef_description' => $request->chef_description,
        ]);
    
        return response()->json([
            'message' => 'User and chef updated successfully!',
            'user' => $user,
            'chef' => $chef,
        ], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chef $chef)
    {
        $chef->delete();

        return response()->json(null, 204);
    }
}



    
   

   
 
