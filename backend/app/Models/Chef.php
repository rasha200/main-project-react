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

