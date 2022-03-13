<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\IdentityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('build-context', [IdentityController::class, 'buildContext']);
Route::post('store-message', [ConversationController::class, 'storeMessage'])->middleware('verifyIdentity');
Route::get('contextual-conversation/{identity}', [ConversationController::class, 'loadContextualMessages']);
Route::get('messages', [ConversationController::class, 'messsageList']);
Route::post('update-identity', [IdentityController::class, 'updateIdentity'])->middleware('verifyIdentity');
