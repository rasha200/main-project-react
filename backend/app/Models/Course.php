<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['course_name', 'course_description', 'course_start_date', 'course_end_date', 'chef_id'];

    public function tasks()
    {
        return $this->hasMany(Task::class , 'course_id');
    }

    public function chef()
    {
        return $this->belongsTo(Chef::class); // A course belongs to a chef
    }
    
    public function students()
    {
        return $this->belongsToMany(Student::class, 'coursesStudent'); // Many-to-many with students
    }
}

