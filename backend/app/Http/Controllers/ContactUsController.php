<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function index()
    {
        return response()->json(ContactUs::all());

    }





    public function store(Request $request)
    {
        ContactUs::create([
        'contact_subject' => $request->contact_subject,
        'contact_message' => $request->contact_message,
        'user_id' => $request->user_id,
    ]);

    return response()->json([
        'message' => 'Contact Us created successfully'
    ] , 201);
    }



   
    public function show(ContactUs $contactUs)
    {
        return response()->json([
            "contact" => $contactUs,
            "status" => 200,
        ],200);

    }





  
    public function destroy(ContactUs $contactUs)
    {
        $ContactUs->Delete();

        return response()->json([
            'message' => 'Contact Us deleted successfully'
        ] , 201);
    }
}
