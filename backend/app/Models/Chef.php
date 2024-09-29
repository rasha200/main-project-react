<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Chef extends Model
{
    use HasFactory;

    protected $table = 'chefs';

    protected $fillable = [
        'Fname', 
        'course_id',  
    ];

    public function feedbacks()
    {
        return $this->hasMany(ChefFeedback::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}

