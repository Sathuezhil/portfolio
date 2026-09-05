<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class AdminTokenStore
{
    public function issue(): string
    {
        $token = Str::random(64);
        $tokens = $this->all();
        $tokens[$token] = now()->addHours((int) config('admin.token_hours', 12))->toIso8601String();
        $this->write($tokens);

        return $token;
    }

    public function valid(?string $token): bool
    {
        if (! $token) {
            return false;
        }

        $tokens = $this->all();
        $expires = $tokens[$token] ?? null;

        if (! $expires || now()->gte($expires)) {
            unset($tokens[$token]);
            $this->write($tokens);

            return false;
        }

        return true;
    }

    public function forget(?string $token): void
    {
        if (! $token) {
            return;
        }

        $tokens = $this->all();
        unset($tokens[$token]);
        $this->write($tokens);
    }

    /**
     * @return array<string, string>
     */
    private function all(): array
    {
        $path = $this->path();

        if (! File::exists($path)) {
            return [];
        }

        $decoded = json_decode(File::get($path), true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @param  array<string, string>  $tokens
     */
    private function write(array $tokens): void
    {
        File::put($this->path(), json_encode($tokens, JSON_PRETTY_PRINT));
    }

    private function path(): string
    {
        return storage_path('app/admin-tokens.json');
    }
}
