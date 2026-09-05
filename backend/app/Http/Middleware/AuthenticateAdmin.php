<?php

namespace App\Http\Middleware;

use App\Services\AdminTokenStore;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAdmin
{
    public function __construct(private AdminTokenStore $tokens) {}

    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->tokens->valid($request->bearerToken())) {
            return response()->json(['message' => 'Unauthorized.'], 401);
        }

        return $next($request);
    }
}
