<?php

namespace App\Services;

use App\Models\Message;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
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
            'id' => (string) Str::ulid(),
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

        $existing = $this->fileMessages();
        $existing[] = $payload;
        $this->writeFile($existing);

        return ['storage' => 'file'];
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function all(): array
    {
        $messages = $this->fromMongo() ?? $this->normalizedFileMessages();

        usort($messages, function (array $a, array $b) {
            return strcmp((string) ($b['created_at'] ?? ''), (string) ($a['created_at'] ?? ''));
        });

        return array_values($messages);
    }

    /**
     * @return array<string, mixed>|null
     */
    public function markRead(string $id): ?array
    {
        if ($mongo = $this->fromMongo()) {
            try {
                $message = Message::query()->where('_id', $id)->orWhere('id', $id)->first();

                if (! $message) {
                    return null;
                }

                $message->read = true;
                $message->save();

                return $this->fromMongoModel($message);
            } catch (Throwable) {
                // Fall through to file store.
            }
        }

        $messages = $this->normalizedFileMessages();
        $found = null;

        foreach ($messages as $index => $message) {
            if (($message['id'] ?? '') === $id) {
                $messages[$index]['read'] = true;
                $found = $messages[$index];
                break;
            }
        }

        if (! $found) {
            return null;
        }

        $this->writeFile($messages);

        return $found;
    }

    public function delete(string $id): bool
    {
        if (extension_loaded('mongodb')) {
            try {
                $message = Message::query()->where('_id', $id)->orWhere('id', $id)->first();

                if ($message) {
                    $message->delete();

                    return true;
                }
            } catch (Throwable) {
                // Fall through to file store.
            }
        }

        $messages = $this->normalizedFileMessages();
        $filtered = array_values(array_filter(
            $messages,
            fn (array $message) => ($message['id'] ?? '') !== $id
        ));

        if (count($filtered) === count($messages)) {
            return false;
        }

        $this->writeFile($filtered);

        return true;
    }

    /**
     * @return list<array<string, mixed>>|null
     */
    private function fromMongo(): ?array
    {
        if (! extension_loaded('mongodb')) {
            return null;
        }

        try {
            return Message::query()
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(fn ($message) => $this->fromMongoModel($message))
                ->values()
                ->all();
        } catch (Throwable) {
            return null;
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function fromMongoModel(Message $message): array
    {
        return [
            'id' => (string) ($message->id ?? $message->_id),
            'name' => $message->name,
            'email' => $message->email,
            'subject' => $message->subject,
            'message' => $message->message,
            'read' => (bool) $message->read,
            'created_at' => optional($message->created_at)?->toIso8601String() ?? now()->toIso8601String(),
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function normalizedFileMessages(): array
    {
        $messages = $this->fileMessages();
        $changed = false;

        foreach ($messages as $index => $message) {
            if (! is_array($message)) {
                continue;
            }

            if (empty($message['id'])) {
                $messages[$index]['id'] = (string) Str::ulid();
                $changed = true;
            }

            $messages[$index]['read'] = (bool) ($message['read'] ?? false);
        }

        if ($changed) {
            $this->writeFile($messages);
        }

        return array_values($messages);
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function fileMessages(): array
    {
        $path = $this->path();

        if (! File::exists($path)) {
            return [];
        }

        $decoded = json_decode(File::get($path), true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @param  list<array<string, mixed>>  $messages
     */
    private function writeFile(array $messages): void
    {
        File::put($this->path(), json_encode(array_values($messages), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    private function path(): string
    {
        return storage_path('app/messages.json');
    }
}
