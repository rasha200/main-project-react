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
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->text('feedback');
            $table->unsignedBigInteger('student_id');
            $table->foreign(columns: 'student_id')->references('id')->on('students');
            $table->unsignedBigInteger('chef_id');
            $table->foreign(columns: 'chef_id')->references('id')->on('chefs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};
