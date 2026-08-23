<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Message extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'messages';

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'read',
    ];

    protected $casts = [
        'read' => 'boolean',
    ];
}
