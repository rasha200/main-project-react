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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_name');
            $table->text('task_description');
            $table->date('task_end_date');
            $table->string('task_file')->nullable();
            $table->string('task_img')->nullable();
            $table->enum('task_status', ['Pending', 'Completed'])->default('Pending');
            $table->unsignedBigInteger('course_id');
            $table->foreign(columns: 'course_id')->references('id')->on('courses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
