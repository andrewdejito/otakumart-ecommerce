<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Display the cart page
    public function index()
    {
        $userId = Auth::id();

        // Get user items with product details
        $cartItems = CartItem::with('product')->where('user_id', $userId)->get();

        // Calculate subtotal
        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return view('cart.index', compact('cartItems', 'subtotal'));
    }

    public function create()
    {
        //
    }

    // Add item to cart
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $userId = Auth::id();
        $quantity = $request->input('quantity', 1);

        // Check if item exists in cart
        $cartItem = CartItem::where('user_id', $userId)
                            ->where('product_id', $request->product_id)
                            ->first();

        if ($cartItem) {
            // Update quantity if exists
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            // Create new entry
            CartItem::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'quantity' => $quantity
            ]);
        }

        return redirect()->back()->with('success', 'Item added to cart!');
    }

    public function show(CartItem $cartItem)
    {
        //
    }

    public function edit(CartItem $cartItem)
    {
        //
    }

    // Update item quantity
    public function update(Request $request, CartItem $cartItem)
    {
        // Verify ownership
        if ($cartItem->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem->update(['quantity' => $request->quantity]);

        return redirect()->route('cart.index')->with('success', 'Cart updated!');
    }

    // Remove item from cart
    public function destroy(CartItem $cartItem)
    {
        // Verify ownership
        if ($cartItem->user_id !== Auth::id()) {
            abort(403);
        }

        $cartItem->delete();

        return redirect()->route('cart.index')->with('success', 'Item removed.');
    }
}