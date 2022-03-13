<?php

namespace App\Http\Controllers;

use App\Models\Identity;
use Illuminate\Support\Str;
use App\Models\MessagesList;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function storeMessage(Request $request)
    {
        $identity = Identity::where('identity', $request->identity_token)->first()->id;
        $filename = null;
        if($request->file('attachment')){
            $file      = $request->file('attachment');
            $filename  = (string)Str::uuid();
            $filename = $filename . "." . $file->getClientOriginalExtension();
            $file->move(public_path('attachments'), $filename);
        }
        $messageList = new MessagesList;
        $messageList->identity_id = $identity;
        $messageList->user_message = $request->user_message;
        $messageList->bot_reply = $request->bot_reply;
        $messageList->user_attachment = $filename ? asset('attachments/' . $filename) : null;
        $messageList->save();

        return response(200);
    }

    public function messsageList()
    {
        $messages = MessagesList::with('identity')->get();

        return response()->json($messages);
    }

    public function loadContextualMessages($identity)
    {
        $identity= Identity::where('identity', $identity)->first();
        if($identity){
            $messages = MessagesList::where('identity_id', $identity->id)->get();
            if($messages->count() > 0){
                $res = [];
                foreach ($messages as $message) {
                    $res[] = [
                        'textMessage' => $message->user_message,
                        'type' => 'user',
                        'attachment' => $message->user_attachment
                    ];

                    $res[] = [
                        'textMessage' => $message->bot_reply,
                        'type' => 'bot',
                        'attachment' => null
                    ];
                }
                return response()->json($res, 200);
            }
        }

        return response()->json([]);
    }
}
