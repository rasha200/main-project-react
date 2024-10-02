<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SupervisorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'users' => User::where('role', 'supervisor')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
  

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'Fname' => 'required|string|max:255',
            'Lname' => 'required|string|max:255',
            'user_age' => 'required|integer',
            'user_email' => 'required|email|unique:users,user_email',
            'user_number' => 'required|string',
            'user_gender' => 'required|string',
            'user_img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'role' => 'required|string',
            'user_password' => 'required|string|min:8',
        ]);
    
       
        $imagePath = null;
    
       
        if ($request->hasFile('user_img')) {
            $file = $request->file('user_img');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = public_path('././././uploads'); // check the path
            $file->move($path, $filename);
    
           
            $imagePath = '././././uploads' . $filename;
        }
    
        
        User::create([
            'Fname' => $validatedData['Fname'],
            'Lname' => $validatedData['Lname'],
            'user_age' => $validatedData['user_age'],
            'user_email' => $validatedData['user_email'],
            'user_number' => $validatedData['user_number'],
            'user_gender' => $validatedData['user_gender'],
            'user_img' => $imagePath, 
            'role' => $validatedData['role'],
            'user_password' => bcrypt($validatedData['user_password']),
        ]);
    
    
            return response()->json([
                'message' => 'supervisor created successfully'
            ] , 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $supervisor)

    {
        $user = User::findOrFail($supervisor);
        return response()->json( $user);
    }

    /**
     * Show the form for editing the specified resource.
     */
  

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $supervisor)
    {
        $user = User::findOrFail($supervisor);
        $validatedData = $request->validate([
            'Fname' => 'required|string|max:255',
            'Lname' => 'required|string|max:255',
            'user_age' => 'required|integer',
            'user_email' => 'required|email',
            'user_number' => 'required|string',
            'user_gender' => 'required|string',
            'user_img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'role' => 'required|string',
            'user_password' => 'required|string|min:8',
        ]);
    
       
        $imagePath = null;
    
       
        if ($request->hasFile('user_img')) {
            $file = $request->file('user_img');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = public_path('././././uploads'); // check the path
            $file->move($path, $filename);
    
           
            $imagePath = '././././uploads' . $filename;
        }
    
        
        $user->update([
            'Fname' => $validatedData['Fname'],
            'Lname' => $validatedData['Lname'],
            'user_age' => $validatedData['user_age'],
            'user_email' => $validatedData['user_email'],
            'user_number' => $validatedData['user_number'],
            'user_gender' => $validatedData['user_gender'],
            'user_img' => $imagePath, 
            'role' => $validatedData['role'],
            'user_password' => bcrypt($validatedData['user_password']),
        ]);
    
    
            return response()->json([
                'message' => 'supervisor updated successfully',
                'updated_supervisor' => $supervisor
                
            ] , 200); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $supervisor)
    {
        $user = User::findOrFail($supervisor);
        $user->Delete();
        return response()->json([
            'message' => 'supervisor deleted successfully',
            'supervisor deleted'=> $supervisor
        ],201);
    }
}
