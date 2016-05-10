<?php

namespace App;


use Illuminate\Database\Eloquent\Model;


class Setting extends Model 
{
	protected $table='settings';
	//this is used to fill data to the settings table 
	protected $fillable = [
        'id', 'value'
    ];
  
    public $timestamps = false;
}