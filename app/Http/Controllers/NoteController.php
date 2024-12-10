<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteStoreRequest;
use App\Http\Requests\NoteUpdateRequest;
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
        $response = ['notes' => Note::tree()->get()->toTree()];

        return inertia("Dashboard", $response);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request, $id)
    {
        $note = Note::find($id);
        $note->update($request->all());
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id)
    {
        // $note = Note::find($id)->delete();
        $note = Note::find($id);
        $note->deleteAllChildrenNotes();
        $note->delete();
    }

    public function store(NoteStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        Note::create($data);
    }

    public function show($id)
    {
        $allNotes = Note::all();
        $note = $allNotes->find($id);
        // $noteId = request('id', -1);
        // $note = $noteId ? Note::find($noteId) : null;

        return inertia("Dashboard", ['notes' => Note::tree()->get()->toTree(), 'note' => new NoteResource($note)]);
    }
}
