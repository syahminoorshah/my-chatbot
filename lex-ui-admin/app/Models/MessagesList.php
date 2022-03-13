<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessagesList extends Model
{
    use HasFactory;

    public function identity()
    {
        return $this->hasOne(Identity::class, 'id', 'identity_id');
    }
}
