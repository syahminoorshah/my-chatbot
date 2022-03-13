<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Identity;
use Illuminate\Http\Request;

class VerifiIdentityMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $identity = Identity::where('identity', $request->identity_token)->first();
        if ($identity) {
            return $next($request);
        }

        return response()->json([], 419);
    }
}
