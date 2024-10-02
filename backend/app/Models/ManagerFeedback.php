<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerFeedback extends Model
{
    use HasFactory;

    protected $fillable = ['feedback', 'manager_id', 'chef_id', 'supervisor_id'];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id'); 
    }

    public function chef()
    {
        return $this->belongsTo(Chef::class, 'chef_id'); 
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id')->where('role', 'supervisor'); 
    }
}
