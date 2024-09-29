<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
Schema::table('tasks', function (Blueprint $table) {
$table->unsignedBigInteger('student_id')->nullable(); // Add student_id column
$table->foreign('student_id')->references('id')->on('students')->onDelete('cascade'); // Set foreign key relationship
});
}

public function down(): void
{
Schema::table('tasks', function (Blueprint $table) {
$table->dropForeign(['student_id']);
$table->dropColumn('student_id');
});
}
};
