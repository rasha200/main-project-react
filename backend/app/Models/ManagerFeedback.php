<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerFeedback extends Model
{
    protected $fillable = ['feedback', 'Maneger_id', 'chef_id'];

    public function Maneger()
    {
        return $this->belongsTo(Manager::class, 'Maneger_id');
    }

    public function chef()
    {
        return $this->belongsTo(Chef::class, 'chef_id');
    }
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(user::class, 'user_id');
    }
    use HasFactory;
}
