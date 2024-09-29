<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    public function tasks()
    {
        return $this->hasMany(Task::class , 'course_id');
    }

    // A course belongs to a chef
    public function chef()
    {
        return $this->belongsTo(Chef::class ,'chef_id'); // Assuming Chef is a model
    }
}
