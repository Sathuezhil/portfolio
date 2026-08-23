<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class PortfolioController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $path = resource_path('data/portfolio.json');

        return response()->json(json_decode(File::get($path), true));
    }
}
