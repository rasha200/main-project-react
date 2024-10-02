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

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function courses()
    {
        return $this->hasMany(Course::class); // A chef can manage multiple courses
    }
    public function chefs()
    {
        return $this->hasMany(Chef::class, 'ched_id');
    }
    
    public function managerFeedbacks()
    {
        return $this->hasMany(ManagerFeedback::class, 'manager_id');
    }
    
    public function supervisors()
    {
        return $this->hasMany(Supervisor::class, 'user_id');
    }

}
