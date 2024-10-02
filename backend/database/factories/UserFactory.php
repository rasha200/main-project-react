<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;



class UserFactory extends Factory
{

protected $model = User::class;

    public function definition()
    {
        return [
            'Fname' => $this->faker->firstName(),            // First name
            'Lname' => $this->faker->lastName(),              // Last name
            'user_age' => $this->faker->numberBetween(18, 60), // Random age between 18 and 60
            'user_email' => $this->faker->unique()->safeEmail(), // Unique email
            'user_number' => $this->faker->phoneNumber(),     // Random phone number
            'user_gender' => $this->faker->randomElement(['Male', 'Female']), // Random gender
            'user_img' => $this->faker->imageUrl(),           // Random image URL
            'role' => $this->faker->randomElement(['student', 'manager', 'chef', 'supervisor']), // Random role
            'user_password' => bcrypt('password'),             // Default password
        ];
    }



}