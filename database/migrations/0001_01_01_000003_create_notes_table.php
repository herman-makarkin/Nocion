<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->jsonb('content')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('icon')->nullable();
            $table->boolean('is_archived')->nullable();
            $table->boolean('is_published')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('parent_id')->nullable()->constrained('notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
