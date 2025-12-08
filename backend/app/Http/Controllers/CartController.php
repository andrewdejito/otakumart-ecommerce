<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Get user's cart items
    public function index()
    {
        $userId = Auth::id();
        $cartItems = CartItem::with('product.category')
            ->where('user_id', $userId)
            ->get();

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return response()->json([
            'cart_items' => $cartItems,
            'subtotal' => $subtotal
        ]);
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

        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'quantity' => $quantity
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart',
            'cart_item' => $cartItem->load('product')
        ], 201);
    }

    // Update item quantity
    public function update(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);

        if ($cartItem->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Cart updated',
            'cart_item' => $cartItem->load('product')
        ]);
    }

    // Remove item from cart
    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);

        if ($cartItem->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    // Clear entire cart
    public function clear()
    {
        $userId = Auth::id();
        CartItem::where('user_id', $userId)->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
}