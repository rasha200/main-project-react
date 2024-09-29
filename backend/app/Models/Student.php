<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ChefFeedback;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['Fname', 'Lname']; 

    public function feedbacks()
    {
        return $this->hasMany(ChefFeedback::class, 'student_id');
    }

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
