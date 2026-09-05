<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AdminTokenStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function login(Request $request, AdminTokenStore $tokens): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $email = (string) config('admin.email');
        $password = (string) config('admin.password');

        if ($email === '' || $password === '') {
            return response()->json(['message' => 'Admin login is not configured.'], 503);
        }

        $emailOk = strlen($email) === strlen($data['email']) && hash_equals($email, $data['email']);
        $passwordOk = strlen($password) === strlen($data['password'])
            && hash_equals($password, $data['password']);

        if (! $emailOk || ! $passwordOk) {
            return response()->json(['message' => 'Invalid email or password.'], 422);
        }

        return response()->json([
            'token' => $tokens->issue(),
            'email' => $email,
        ]);
    }

    public function me(): JsonResponse
    {
        return response()->json([
            'email' => config('admin.email'),
        ]);
    }

    public function logout(Request $request, AdminTokenStore $tokens): JsonResponse
    {
        $tokens->forget($request->bearerToken());

        return response()->json(['message' => 'Signed out.']);
    }
}
