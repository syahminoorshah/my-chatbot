<?php

namespace App\Http\Controllers;

use App\Models\Identity;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IdentityController extends Controller
{
    public function buildContext()
    {
        $uuid = (string)Str::uuid();

        $identity = new Identity();
        $identity->identity = $uuid;
        $identity->save();

        return response()->json([
            "id" => $uuid
        ]);
    }

    public function updateIdentity(Request $request)
    {
        Log::debug($request->all());
        $identity = Identity::where('identity', $request->identity_token)->first();

        if($identity){
            $identity->name = $request->Name ?? null;
            $identity->email = $request->Email ?? null;
            $identity->phone = $request->Phone ?? null;
            $identity->area = $request->Area ?? null;
            $identity->hospital = $request->Hospital ?? null;
            $identity->brand = $request->Brand ?? null;
            $identity->dept = $request->Dept ?? null;
            $identity->save();
        }
        return;
    }
}
