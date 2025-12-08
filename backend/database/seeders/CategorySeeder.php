<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Electronics', 'Clothing'];

        foreach ($categories as $name) {
            Category::updateOrCreate(
                ['slug' => Str::slug($name)], 
                ['name' => $name, 'slug' => Str::slug($name)]
            );
        }
    }
}
