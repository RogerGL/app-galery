<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Content extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name', 'category_id', 'description', 'img', 'user_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
