<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnosController;
use App\Http\Controllers\MenuController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/inicio/alumno', function () {
    return view('welcome');
});
Route::get('/login', function () {
    return view('welcome');
});
Route::get('/login/cafeteria', function () {
    return view('welcome');
});
Route::get('/inicio/alumno/perfil', function (){
    return view('welcome');
});
Route::get('/inicio/cafeteria', function (){
    return view('welcome');
});
Route::get('/inicio/cafeteria/menu', function (){
    return view('welcome');
});
Route::get('/inicio/cafeteria/alumnos', function (){
    return view('welcome');
});

Route::get('/api/mostrarPlatillos', [MenuController::class, 'index']);


//Mostrar el token para alumnos
Route::get('/mostrarToken',[AlumnosController::class, 'showToken']);