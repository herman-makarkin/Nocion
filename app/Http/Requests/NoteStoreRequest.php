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
            'content' => ['nullabe', 'string'],
            'icon' => ['nullabe', 'string'],
            'cover_image' => ['nullabe', 'string'],
            'created_by' => ['string'],
            'parent_id' => ['nullable'],
        ];
    }
}
