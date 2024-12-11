<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteStoreRequest;
use App\Http\Resources\NoteResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Note;
use Illuminate\Support\Str;

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
        $image = $request['image'] ?? null;
        $image = $request['image'] ?? null;

        if ($image) {
            $request['cover_image'] = $image->store('note/' . Str::random(), 'public');
        } else {
            $request['cover_image'] = null;
        }

        $note->update($request->all());
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id)
    {
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
