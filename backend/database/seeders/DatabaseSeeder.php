<?php

namespace Database\Seeders;
use App\Models\Feedback;
use Illuminate\Database\Seeder;
use Database\Seeders\FeedbackSeeder; 

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // استدعاء FeedbackSeeder
        $this->call(Feedback::class);
    }
}
