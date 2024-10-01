<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Student::class;

     public function definition()
     {
         return [
             'parent_name' => $this->faker->name(),
             'parent_number' => $this->faker->phoneNumber(),
             'id_img' => $this->faker->imageUrl(),  // Placeholder for image
             'student_status' => $this->faker->randomElement(['Rejected', 'Confirmed', 'Pending']),
             'user_id' => \App\Models\User::factory(),  // Link to UserFactory
            ];
     
    }
}
