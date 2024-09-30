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
        $user = User::findOrFail($id);  // Find the user by id or throw 404
        $imagePath = null;

   
        if ($request->hasFile('user_img')) {
            $file = $request->file('user_img');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = public_path('././././uploads'); // check the path
            $file->move($path, $filename);
    
           
            $imagePath = '././././uploads' . $filename;
        }
        $user->update([
            'Fname'=> $request['Fname'],
            'Lname'=> $request['Lname'],
            'user_age'=> $request['user_age'],
            'user_email'=> $request['user_email'],
            'user_number'=> $request['user_number'],
            'user_gender'=> $request['user_gender'],
            'user_img'=> $imagePath,
            'role'=> $request['role'],
            'user_password'=> bcrypt($request['user_password']),
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'updated_user' => $user
        ], 200);  // Use 200 for update response
    }

    public function destroy(User $user )
    {
       $user->delete();
       return response()->json([
           'message' => 'User deleted successfully',
           'user deleted'=> $user
       ],
           201);
    }
}
