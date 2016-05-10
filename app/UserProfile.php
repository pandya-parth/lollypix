<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $table='user_profile'; 

    //Relation between user and user profile 
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
