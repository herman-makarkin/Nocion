<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteStoreRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\NoteResource;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Note;

class NoteController extends Controller
{
    public function index()
    {
        $query = Note::query();
        echo $query;

        return inertia("Dashboard", ['notes' => NoteResource::collection($query)]);
    }

    public function edit()
    {
        // $result = $noteId ? Note::find($noteId) : null;
        // // $query = Note::query();
        // // $notes = $query->orderBy('title', 'asc');
        $response = ['notes' => Note::all()];
        // echo 'hi';
        // if ($result) {
        //     $response['note'] = $result;
        //     echo 'hi2';
        // }

        return inertia("Dashboard", $response);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function store(NoteStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        Note::create($data);
    }

    public function show(Note $noteId)
    {
        $allNotes = Note::all();
        $note = $allNotes->find($noteId);
        // $noteId = request('id', -1);
        // $note = $noteId ? Note::find($noteId) : null;

        return inertia("Dashboard", ['notes' => Note::all(), 'note' => new NoteResource($note)]);
    }
}
