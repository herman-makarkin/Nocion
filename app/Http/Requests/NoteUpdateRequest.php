<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NoteUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'nullable', 'string'],
            'content' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'created_by' => ['nullable', 'string'],
            'parent_id' => ['nullable'],
        ];
    }
}
