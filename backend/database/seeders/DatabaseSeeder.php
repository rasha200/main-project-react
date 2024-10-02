<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Chef; // If you reference chefs
use App\Models\Student; // If you reference students
// use App\Models\Feedback;

use Illuminate\Database\Seeder;
use Database\Seeders\FeedbackSeeder; 

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(Feedback::class);

        // Seed Chefs
        $chefs = Chef::factory()->count(10)->create();

        // Seed Courses
        $courses = Course::factory()->count(10)->create();

        // Seed Students
        $students = Student::factory()->count(50)->create();

        // Assign courses to students (populate pivot table)
        $students->each(function ($student) use ($courses) {
            $student->courses()->attach(
                $courses->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}

