<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnosController;

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
//Ruta para obtener todo
Route::get('/alumnos', [AlumnosController::class, 'index']);
//Ruta para obtener algo en especifico
Route::get('/alumnosNumeroControl', [AlumnosController::class, 'show']);
//Ruta para insertar lo que es algo nuevo
Route::post('/nuevoAlumno', [AlumnosController::class, 'store']);