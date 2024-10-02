<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manager extends Model
{
    use HasFactory;

    protected $table = 'manager_feedbacks';

    protected $fillable = [
        'Fname', 
      
    ];

    public function feedbacks()
    {
        return $this->hasMany(ManagerFeedback::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
