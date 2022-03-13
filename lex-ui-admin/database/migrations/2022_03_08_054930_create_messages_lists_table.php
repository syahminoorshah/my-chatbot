<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages_lists', function (Blueprint $table) {
            $table->id();
            $table->text('user_message');
            $table->bigInteger('identity_id');
            $table->text('bot_reply')->nullable();
            $table->text('user_attachment')->nullable();
            $table->text('bot_attachment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages_lists');
    }
};
