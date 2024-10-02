<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ChefFeedback;

class Student extends Model
{
    use HasFactory;



    public function courses()
    {
        return $this->belongsToMany(Course::class, 'coursesStudent'); // Many-to-many with courses
    }
    

    public function user()
    {
        return $this->belongsTo(User::class);

    }
  
    public function feedbacks()
    {
        return $this->hasMany(ChefFeedback::class, 'student_id');
             $this->hasMany(Task::class);

    }
    
}
