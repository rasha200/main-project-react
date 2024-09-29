<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
<<<<<<< HEAD
    protected $fillable = [
        'parent_name',
        'parent_number',
        'id_img',
        'student_status',
        'user_id',

    ];
    public function tasks()
    {
        return $this->hasMany(Task::class);
=======
    protected $fillable = ['parent_name', 'parent_number', 'id_img', 'student_status', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
>>>>>>> 6cc26093213d82996ea5693a7d56cc8e7145d63e
    }
}
