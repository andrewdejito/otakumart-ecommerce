<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Laptop',
                'description' => 'A high-performance laptop',
                'price' => 1500,
                'category_slug' => 'electronics',
            ],
            [
                'name' => 'T-Shirt',
                'description' => 'A comfortable cotton t-shirt',
                'price' => 25,
                'category_slug' => 'clothing',
            ],
        ];

        foreach ($products as $p) {
            $category = Category::where('slug', $p['category_slug'])->first();
            if ($category) {
                Product::updateOrCreate(
                    ['name' => $p['name']],
                    [
                        'description' => $p['description'],
                        'price' => $p['price'],
                        'category_id' => $category->id,
                    ]
                );
            }
        }
    }
}
