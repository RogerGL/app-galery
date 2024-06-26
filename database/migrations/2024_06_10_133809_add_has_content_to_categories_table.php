<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->boolean('has_content')->default(false);
        });
    }
    
    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('has_content');
        });
    }

};
