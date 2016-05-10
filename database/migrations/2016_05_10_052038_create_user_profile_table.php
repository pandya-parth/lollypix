<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profile', function (Blueprint $table) {
           $table->increments('id')->nullable();
            $table->integer('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender','male','female','other')->default('male');
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('bio')->nullable();//short introduction about user
            $table->string('ip_address')->nullable();
            $table->string('profile_pic')->nullable();
            $table->string('id_proof')->nullable();
            $table->boolean('subscribe');
            $table->string('height')->nullable();
            $table->string('chest_bust')->nullable();
            $table->string('waist')->nullable();
            $table->string('physique')->nullable();
            $table->string('hair_color')->nullable();
            $table->string('shoe_size')->nullable();
            $table->string('eye_color')->nullable();
            $table->string('facebook')->nullable(); 
            $table->string('google_plus')->nullable(); 
            $table->string('twitter')->nullable(); 
            $table->string('linked_in')->nullable(); 
            $table->string('status')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::drop('user_profiles');
    }
}
