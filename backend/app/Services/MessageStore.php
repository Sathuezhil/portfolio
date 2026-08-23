<?php

namespace App\Services;

use App\Models\Message;
use Illuminate\Support\Facades\File;
use Throwable;

class MessageStore
{
    /**
     * @param  array{name: string, email: string, subject: string, message: string}  $data
     * @return array{storage: string}
     */
    public function create(array $data): array
    {
        $payload = [
            ...$data,
            'read' => false,
            'created_at' => now()->toIso8601String(),
        ];

        if (extension_loaded('mongodb')) {
            try {
                Message::query()->create($payload);

                return ['storage' => 'mongodb'];
            } catch (Throwable) {
                // Fall through to the local JSON store so the form still works.
            }
        }

        $path = storage_path('app/messages.json');
        $existing = File::exists($path)
            ? json_decode(File::get($path), true)
            : [];

        $existing[] = $payload;
        File::put($path, json_encode($existing, JSON_PRETTY_PRINT));

        return ['storage' => 'file'];
    }
}
