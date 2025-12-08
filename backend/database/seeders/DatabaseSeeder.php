<?php

namespace Database\Seeders;

<<<<<<< HEAD
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
=======
>>>>>>> a58ec06697fbda4a5ffc8e79773ea9048897cdf3
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
<<<<<<< HEAD
=======
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
>>>>>>> a58ec06697fbda4a5ffc8e79773ea9048897cdf3
        ]);
    }
}
