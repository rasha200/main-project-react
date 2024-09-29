<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['task_name', 'task_description', 'task_end_date', 'task_file', 'task_status', 'course_id', 'student_id'];

    // A task belongs to a course
    public function course()
    {
        return $this->belongsTo(Course::class ,'course_id');
    }

    // A task is assigned to a student
    public function student()
    {
        return $this->belongsTo(Student::class , 'student_id');
    }
}
