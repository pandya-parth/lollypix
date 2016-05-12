<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Tag;
use Validator;
use Former;
use Redirect;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $tags=Tag::all();//list all records
       return view('admin.tags.index',compact('tags')); /* redirect to index page with records */
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.tags.form'); /* this is for open to new tag form*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*check validation */
        $rules = ['name' => 'required|unique:tags,name' , 'photo' => 'required' ];
        $messages = [
            'name.required' => 'This field is require',
            'photo.required' => 'Photo require',
        ];

        $validator = Validator::make($request->all(),$rules,$messages);

        if ($validator->fails()) { /* validation fail then redirect back*/
             Former::withErrors($validator);
            return redirect('admin/tags/create')->withErrors($validator)->withInput();
        } 
        /*if validation success then store data to the database using below code and redirec to tag index page*/
        $tag = new Tag;
        $tag->name = $request->get('name');
        $tag->photo = $request->get('photo');
        $tag->save();
        return redirect('admin/tags');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        /* this is used for update data  this will open update form with data*/
        $tag=Tag::findOrFail($id);
        Former::populate($tag);/* fill data to form*/
        return view('admin.tags.form',compact('tag')); /*open update form */
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
         /*check validation */
         $rules = ['name' => 'required' , 'photo' => 'required' ];
        $messages = [
            'name.required' => 'This field is require',
            'photo.required' => 'Photo require',
        ];

        $validator = Validator::make($request->all(),$rules,$messages);

        if ($validator->fails()) {{ /* validation fail then redirect back*/
             Former::withErrors($validator);
            return redirect('admin/tags/edit')->withErrors($validator)->withInput();
        } 
         /*if validation success then update data to the database using below code and redirect to tag index page*/
         $tag = tag::find($id);
         $tag->fill( $request->all() );   
         
         $tag->save();
         return Redirect::route('admin.tags.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /*delete record */
        $tag = Tag::find($id);
        $tag->delete();
        return Redirect::route('admin.tags.index');/*after delete redirect to index page */
    }
   
}
