<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
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
    

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return $this
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
