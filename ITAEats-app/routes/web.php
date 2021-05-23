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
Route::post('/api/agregarPlatillo', [MenuController::class, 'store']);

//Ruta para obtener todo
Route::get('/alumnos', [AlumnosController::class, 'index']);

//Ruta para obtener algo en especifico
Route::get('/api/alumnosNumeroControl', [AlumnosController::class, 'show']);
//Ruta para insertar lo que es algo nuevo
Route::post('/api/nuevoAlumno', [AlumnosController::class, 'store']);
Route::get('/api/iniciarSesion', [AlumnosController::class, 'iniciarSesion']);


//Ruta para borrar un registro mediante lo que es un número de control.
Route::post('/eliminarAlumno',[AlumnosController::class, 'destroy']);
//Ruta para actualizar un registro mediante lo que es su número de control
Route::post('/actualizarAlumno',[AlumnosController::class, 'update']);
//Mostrar el token para alumnos
Route::get('/mostrarToken',[AlumnosController::class, 'showToken']);