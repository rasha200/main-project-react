<?php

namespace Database\Factories;
use App\Models\Course; 
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Course::class;

    public function definition()
    {
        return [
            'course_name' => $this->faker->words(3, true),
            'course_description' => $this->faker->paragraph(),
            'course_start_date' => $this->faker->date(),
            'course_end_date' => $this->faker->date(),
            'chef_id' => \App\Models\Chef::factory(),  // Create a Chef if not already existing
        ];
    }
}

