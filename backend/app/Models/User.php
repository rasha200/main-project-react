<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'Fname',
        'Lname',
        'user_age',
        'user_email',
        'user_number',
        'user_gender',
        'user_img',
        'role',
        'email_verified_at',
        'user_password',
    ];

    protected $hidden = [
        'user_password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function students()
    {
        return $this->hasMany(Student::class, 'Student_id');
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
