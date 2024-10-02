<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;


    protected $fillable = ['parent_name', 'parent_number', 'id_img', 'student_status', 'user_id'];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'coursesStudent'); // Many-to-many with courses
    }
    

    public function user()
    {
        return $this->belongsTo(User::class);

    }
    public function tasks()
    {
        return $this->hasMany(Task::class);

}

}

