<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // ✅ Check if user is authenticated first
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // ✅ Then check role
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied - Admins only'], 403);
        }

        return $next($request);
    }
}