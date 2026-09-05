<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ContentStore;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function __invoke(ContentStore $store): JsonResponse
    {
        return response()->json($store->get());
    }
}
