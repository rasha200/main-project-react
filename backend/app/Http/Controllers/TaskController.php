<?php

    namespace App\Http\Controllers;

        use App\Models\Task;
        use App\Models\Course;
        use App\Models\Student;
        use Illuminate\Http\Request;

    class TaskController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
        public function index()
        {
            return response()->json(Task::with('student', 'course')->get());
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request)
        {
            $request->validate([
                'task_name' => 'required|string|max:255',
                'task_description' => 'required|string',
                'task_end_date' => 'required|date',
                'course_id' => 'required|exists:courses,id',
                'student_id' => 'required|exists:students,id',
            ]);

            $course = Course::where('id', $request->course_id)->first();
            if (!$course) {
                return response()->json(['message' => 'Unauthorized: You are not the chef for this course.'], 403);
            }

            $task = Task::create([
                'task_name' => $request->task_name,
                'task_description' => $request->task_description,
                'task_end_date' => $request->task_end_date,
                'task_file' => $request->file('task_file') ? $request->file('task_file')->store('tasks') : null,
                'course_id' => $request->course_id,
                'student_id' => $request->student_id,
                'task_status' => 'Pending',
            ]);

            return response()->json($task, 201);
        }

        /**
         * Display the specified resource.
         */
        public function show(Task $task)
        {
            $task->load('student', 'course');
            return response()->json($task);
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, Task $task)
        {
            $request->validate([
                'task_name' => 'required|string|max:255',
                'task_description' => 'required|string',
                'task_end_date' => 'required|date',
                'course_id' => 'required|exists:courses,id',
                'student_id' => 'required|exists:students,id',
            ]);



            $task->update([
                'task_name' => $request->task_name,
                'task_description' => $request->task_description,
                'task_end_date' => $request->task_end_date,
                'task_file' => $request->file('task_file') ? $request->file('task_file')->store('tasks') : $task->task_file,
                'course_id' => $request->course_id,
                'student_id' => $request->student_id,
                'task_status' => $request->task_status ?? $task->task_status,
            ]);

            return response()->json($task, 200);
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Task $task )
        {


            $task->delete();
            return response()->json(['message' => 'Task deleted successfully.'], 200);
        }


}
