<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
/* this is for call sulggable */
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;

class Tag extends Model implements SluggableInterface
{
    
    use SluggableTrait;
    
    protected $table="tags";
    protected $fillable=['name','photo',];

    protected $sluggable = [
        'build_from' => 'name',
        'save_to'    => 'slug',
    ];
    
}

