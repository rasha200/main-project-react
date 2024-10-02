<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonials;

class TestimonialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 10 testimonial records
        Testimonials::factory()->count(20)->create();
    }
}
