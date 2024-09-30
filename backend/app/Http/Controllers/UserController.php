<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        
        $user = new User();
        $user->Fname = $request->Fname;
        $user->Lname = $request->Lname;
        $user->user_age = $request->user_age;
        $user->user_email = $request->user_email;
        $user->user_number = $request->user_number;
        $user->user_gender = $request->user_gender;
        $user->user_password = Hash::make($request->user_password); 
        $user->save();

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->Fname = $request->Fname;
        $user->Lname = $request->Lname;
        $user->user_age = $request->user_age;
        $user->user_email = $request->user_email;
        $user->user_number = $request->user_number;
        $user->user_gender = $request->user_gender;

        if ($request->user_password) {
            $user->user_password = Hash::make($request->user_password); // Hashing the password
        }

        $user->save();
        return response()->json($user);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(null, 204);
    }
}
