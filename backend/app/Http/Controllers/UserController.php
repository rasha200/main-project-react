<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        return response()->json(User::all());
    }

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
                'message' => 'user created successfully'
            ] , 201);
    }

    public function show(User $user)

    {
       
        return response()->json( $user);
    }

    public function update(Request $request, User $user)
    {
        
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
                'message' => 'user updated successfully',
                'updated_user' => $user
                
            ] , 200); 
    }

   
    public function destroy(User $user)
    {
       $user->delete();
       return response()->json([
           'message' => 'User deleted successfully',
           'user deleted'=> $user
       ],
           201);
    }
}
