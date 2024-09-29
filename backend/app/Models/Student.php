<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;


    protected $fillable = ['parent_name', 'parent_number', 'id_img', 'student_status', 'user_id'];
    public function tasks()
    {
        return $this->hasMany(Task::class);

}
    public function user(){
        return $this->belongsTo(User::class,'user_id');

    }
}
