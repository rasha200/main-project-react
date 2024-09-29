<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=Contacts>
 */
class ContactUsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contact_subject' =>fake()->sentence(),
            'contact_message' =>fake()->paragraph(),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
        ];
    }
}
