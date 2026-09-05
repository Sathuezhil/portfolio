<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ContentStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminContentController extends Controller
{
    public function show(ContentStore $store): JsonResponse
    {
        return response()->json($store->get());
    }

    public function update(Request $request, ContentStore $store): JsonResponse
    {
        $data = $request->validate([
            'profile' => ['required', 'array'],
            'profile.firstName' => ['required', 'string', 'max:80'],
            'profile.lastName' => ['required', 'string', 'max:80'],
            'profile.role' => ['required', 'string', 'max:120'],
            'profile.headline' => ['required', 'string', 'max:120'],
            'profile.location' => ['required', 'string', 'max:180'],
            'profile.email' => ['required', 'email', 'max:180'],
            'profile.phone' => ['required', 'string', 'max:40'],
            'profile.availability' => ['required', 'string', 'max:180'],
            'copy' => ['required', 'array'],
            'copy.heroIntro' => ['required', 'string', 'max:600'],
            'copy.photoTagline' => ['required', 'string', 'max:120'],
            'copy.aboutHeading' => ['required', 'string', 'max:180'],
            'copy.aboutSummary' => ['required', 'string', 'max:1200'],
            'copy.experienceHeading' => ['required', 'string', 'max:220'],
            'copy.workHeading' => ['required', 'string', 'max:220'],
            'copy.workIntro' => ['required', 'string', 'max:400'],
            'copy.skillsHeading' => ['required', 'string', 'max:220'],
            'copy.educationHeading' => ['required', 'string', 'max:120'],
            'copy.contactHeading' => ['required', 'string', 'max:220'],
            'copy.contactIntro' => ['required', 'string', 'max:600'],
            'copy.servicesHeading' => ['required', 'string', 'max:180'],
            'copy.servicesIntro' => ['required', 'string', 'max:400'],
            'copy.nowHeading' => ['required', 'string', 'max:120'],
            'copy.nowStatus' => ['required', 'string', 'max:120'],
            'copy.nowStart' => ['required', 'string', 'max:120'],
            'copy.nowType' => ['required', 'string', 'max:120'],
            'copy.nowWhere' => ['required', 'string', 'max:180'],
        ]);

        return response()->json($store->save($data));
    }
}
