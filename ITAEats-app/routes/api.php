<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\AlumnosController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\UsersController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('agregarPlatillo', [MenuController::class, 'store']);
Route::get('buscarPlatillo', [MenuController::class, 'show']);
Route::post('editarPlatillo', [MenuController::class, 'update']);
Route::post('borrarPlatillo', [MenuController::class, 'destroy']);
Route::get('buscarPlatilloNombre', [MenuController::class, 'buscar']);

Route::post('nuevoAlumno', [AlumnosController::class, 'store']);
Route::get('alumnos', [AlumnosController::class, 'index']);
Route::get('buscarAlumnos', [AlumnosController::class, 'show']);
Route::post('editarAlumnos', [AlumnosController::class, 'update']);
Route::post('borrarAlumno', [AlumnosController::class, 'destroy']);
Route::get('buscarAlumnosNombre', [AlumnosController::class, 'searchNombreCompleto']);

Route::get('pedidos', [PedidosController::class, 'index']);
Route::post('nuevoPedido', [PedidosController::class, 'store']);
Route::post('nuevoPedidoAlumno', [PedidosController::class, 'storeAlumno']);
Route::get('buscarPedidoNumeroDeControl', [PedidosController::class, 'show']);
Route::post('entregarPedido', [PedidosController::class, 'destroy']);
Route::get('buscarPedidoNumeroDeControlLike', [PedidosController::class, 'buscarNumeroControl']);

Route::post('nuevoUsuario',[UsersController::class, 'store']);
Route::get('iniciarSesion', [UsersController::class, 'iniciarSesion']);
Route::get('buscarUsuario', [UsersController::class, 'show']);