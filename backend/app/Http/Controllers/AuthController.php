<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        // Debug: Log eingehende Daten
        \Log::info('Login attempt', ['email' => $request->email]);

        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        \Log::info('Credentials validated', $credentials);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            \Log::info('Auth successful', ['user_id' => $user->id]);
            
            $token = $user->createToken('auth_token')->plainTextToken;
            \Log::info('Token created', ['token_length' => strlen($token)]);

            // Temporär: Vereinfachte Response zum Testen
            $response = [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'token' => $token,
                'success' => true
            ];
            
            \Log::info('Response prepared', ['response_keys' => array_keys($response)]);

            return response()->json($response)
                ->header('Content-Type', 'application/json')
                ->header('Content-Encoding', 'identity')
                ->header('Cache-Control', 'no-cache');
        }

        \Log::info('Auth failed');
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
