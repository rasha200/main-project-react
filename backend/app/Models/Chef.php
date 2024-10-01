<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chef extends Model
{
    use HasFactory;
    protected $fillable = ['chef_description', 'user_id'];

    public function courses()
    {
        return $this->hasMany(Course::class); // A chef can manage multiple courses
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


