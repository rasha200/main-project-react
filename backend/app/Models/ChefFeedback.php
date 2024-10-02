<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChefFeedback extends Model
{
    use HasFactory;

    protected $fillable = ['feedback', 'student_id', 'chef_id'];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function chef()
    {
        return $this->belongsTo(Chef::class, 'chef_id');
    }
}
