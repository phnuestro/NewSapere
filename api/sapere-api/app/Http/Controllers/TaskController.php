<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();

        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'due_at' => ['required', 'date_format:Y-m-d'],
            'status' => ['required', 'string'],
        ])->validate();

        $task = Task::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'due_at' => $request['due_at'],
            'status' => $request['status'],
        ]);

        return response()->json([
            'message' => 'Task Created Successfully!',
            'task' => $task
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task, $id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task, $id)
    {
        Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'due_at' => ['required', 'date_format:Y-m-d'],
            'status' => ['required', 'string'],
        ])->validate();

        $task = Task::find($id);

        $task->update([
            'title' => $request['title'],
            'description' => $request['description'],
            'due_at' => $request['due_at'],
            'status' => $request['status']
        ]);

        return response()->json([
            'message' => 'Task Updated Successfully!',
            'task' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task, $id)
    {
        $task = Task::find($id);

        $task->delete();

        return response()->json([
            'message' => 'Task Deleted Successfully.'
        ]);
    }
}
