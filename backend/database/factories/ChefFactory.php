<?php

namespace Database\Factories;
use App\Models\Chef;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chef>
 */
class ChefFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Chef::class;

    public function definition()
    {
        return [
            'chef_description' => $this->faker->paragraph(),
            'user_id' => \App\Models\User::factory(),  // Assuming you're using a User factory for users
        ];
    }
    }
