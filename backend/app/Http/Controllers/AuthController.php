<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{



    public function login(Request $request)
    {
        // Custom validation rules
        $request->validate([
            'user_email' => 'required|email',
            'user_password' => 'required|string',
        ], [
            'user_email.required' => 'Email is required.',
            'user_email.email' => 'Please provide a valid email address.',
            'user_password.required' => 'Password is required.',
        ]);

        // Find the user by email
        $user = User::where('user_email', $request->user_email)->first();

        // Check if the user exists and the password is correct
        if ($user && Hash::check($request->user_password, $user->user_password)) {


            return response()->json([
                'message' => 'Login successful!',
                'user' => $user,
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }


    // Register method
    public function register(Request $request)
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
            'parent_name' => 'required|string|max:255',
            'parent_number' => 'required|string|max:15',
            'id_img' => 'nullable|string',
            'student_status' => 'required|in:Rejected,Confirmed,Pending'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'Fname' => $request->Fname,
            'Lname' => $request->Lname,
            'user_email' => $request->user_email,
            'user_password' => Hash::make($request->user_password),
            'user_number' => $request->user_number,
            'user_age' => $request->user_age,
            'user_gender' => $request->user_gender,
        ]);

        // Create the student linked to the user
        $student = Student::create([
            'parent_name' => $request->parent_name,
            'parent_number' => $request->parent_number,
            'id_img' => $request->id_img,
            'student_status' => $request->student_status,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'User and Student registered successfully!',
            'user' => $user,
            'student' => $student,
        ], 200);
    }
}
