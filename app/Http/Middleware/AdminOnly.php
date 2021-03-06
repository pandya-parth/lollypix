<?php

namespace App\Http\Middleware;

use Closure;
use Redirect;


class AdminOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(auth()->check() && auth()->user()->role=='admin')
        {
            return $next($request);
        }
        
    }
}
