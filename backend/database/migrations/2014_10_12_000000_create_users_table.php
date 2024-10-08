<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('Fname');
            $table->string('Lname');
            $table->integer('user_age');
            $table->string('user_email')->unique();
            $table->string('user_number');
            $table->enum('user_gender', ['Male', 'Female']);
            $table->string('user_img')->nullable();
            $table->enum('role', ['student', 'manager' , 'chef' , 'supervisor'])->default('student');// Default role is 'student' : [student , manger , superviser , chief]
            $table->timestamp('email_verified_at')->nullable();
            $table->string('user_password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
