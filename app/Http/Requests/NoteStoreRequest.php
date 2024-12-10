<?php

namespace App\Http\Requests;

use App\Models\Note;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NoteStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
            'content' => ['nullable'],
            'icon' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'created_by' => ['string'],
            'parent_id' => ['nullable'],
        ];
    }
}
