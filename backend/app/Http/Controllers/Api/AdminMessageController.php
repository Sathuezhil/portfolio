<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MessageStore;
use Illuminate\Http\JsonResponse;

class AdminMessageController extends Controller
{
    public function index(MessageStore $store): JsonResponse
    {
        $messages = $store->all();

        return response()->json([
            'messages' => $messages,
            'unread' => count(array_filter($messages, fn (array $message) => empty($message['read']))),
        ]);
    }

    public function markRead(string $id, MessageStore $store): JsonResponse
    {
        $message = $store->markRead($id);

        if (! $message) {
            return response()->json(['message' => 'Message not found.'], 404);
        }

        return response()->json(['message' => $message]);
    }

    public function destroy(string $id, MessageStore $store): JsonResponse
    {
        if (! $store->delete($id)) {
            return response()->json(['message' => 'Message not found.'], 404);
        }

        return response()->json(['message' => 'Deleted.']);
    }
}
