<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentProfileController extends Controller
{
    /**
     * Fetch the specified user.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'Fname' => 'required|string|max:255',
            'Lname' => 'required|string|max:255',
            'user_email' => 'required|email|unique:users,user_email,' . $user->id,
            'user_password' => 'nullable|string|min:6',
            'user_img' => 'nullable|string',
        ]);

        $user->Fname = $request->Fname;
        $user->Lname = $request->Lname;
        $user->user_email = $request->user_email;
        if ($request->user_password) {
            $user->user_password = bcrypt($request->user_password);
        }
        $user->user_img = $request->user_img;
        $user->save();

        return response()->json($user, 200);
    }
    
}
