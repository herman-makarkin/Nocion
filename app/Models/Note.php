<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

class Note extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasRecursiveRelationships;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'cover_image',
        'icon',
        'created_by',
        'parent_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function parentNote()
    {
        return $this->belongsTo(Note::class, 'parent_id');
    }

    public function childrenNotes()
    {
        return $this->hasMany(Note::class, 'parent_id');
    }

    public function deleteAllChildrenNotes()
    {
        return $this->hasMany(Note::class, 'parent_id')->with('children')->delete();
    }
}
