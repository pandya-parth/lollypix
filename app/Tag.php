<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
/* this is for call sulggable */
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;
use Event;
use Image;

class Tag extends Model implements SluggableInterface
{
    
    use SluggableTrait;
    
    protected $table="tags";
    protected $fillable=['name','photo'];

    protected $sluggable = [
        'build_from' => 'name',
        'save_to'    => 'slug'
    ];

    public function setPhotoAttribute($file) {
		$source_path = upload_tmp_path($file);
		if ($file && file_exists($source_path)) 
		{
			upload_move($file,'tag');
			Image::make($source_path)->resize(320, 240)->save($source_path);
			upload_move($file,'tag','medium');
			Image::make($source_path)->resize(175, 130)->save($source_path);
			upload_move($file,'tag','thumb');

			@unlink($source_path);
			$this->deleteFile();
		}
		$this->attributes['photo'] = $file;
		if ($file == '') 
		{
			$this->deleteFile();
			$this->attributes['photo'] = "";
		}
	}
	public function photo_url($type='original') 
	{
		if (!empty($this->photo))
			return upload_url($this->photo,'tag',$type);
		elseif (!empty($this->photo) && file_exists(tmp_path($this->photo)))
			return tmp_url($this->photo);
		else
			return asset('img/advertising.jpg');
	}
	public function deleteFile() 
	{
		upload_delete($this->photo,'tag',array('original','thumb','medium'));
	}
    
}
Event::listen('eloquent.deleting:Tag', function($model) {
		$model->deleteFile();
	});

