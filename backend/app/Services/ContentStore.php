<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class ContentStore
{
    /**
     * @return array<string, mixed>
     */
    public function get(): array
    {
        $defaults = $this->defaults();
        $saved = $this->saved();

        return [
            'profile' => array_merge($defaults['profile'], $saved['profile'] ?? []),
            'copy' => array_merge($defaults['copy'], $saved['copy'] ?? []),
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public function save(array $payload): array
    {
        $current = $this->get();
        $next = [
            'profile' => array_merge($current['profile'], $payload['profile'] ?? []),
            'copy' => array_merge($current['copy'], $payload['copy'] ?? []),
        ];

        $digits = preg_replace('/\D+/', '', (string) ($next['profile']['phone'] ?? '')) ?? '';
        $next['profile']['fullName'] = trim(
            ($next['profile']['firstName'] ?? '').' '.($next['profile']['lastName'] ?? '')
        );
        $next['profile']['phoneHref'] = $digits !== '' ? 'tel:+'.$digits : ($next['profile']['phoneHref'] ?? '');

        File::put($this->path(), json_encode($next, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        return $next;
    }

    /**
     * @return array<string, mixed>
     */
    private function saved(): array
    {
        $path = $this->path();

        if (! File::exists($path)) {
            return [];
        }

        $decoded = json_decode(File::get($path), true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @return array{profile: array<string, mixed>, copy: array<string, string>}
     */
    private function defaults(): array
    {
        $path = resource_path('data/site-content.json');

        return json_decode(File::get($path), true);
    }

    private function path(): string
    {
        return storage_path('app/site-content.json');
    }
}
