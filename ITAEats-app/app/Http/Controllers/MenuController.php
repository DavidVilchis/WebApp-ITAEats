<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showToken(){
        echo csrf_token();
    }
    
    public function index()
    {
        return Menu::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Ingresar un nuevo registro
        $menu = new Menu;
        $menu->nombreDePlatillo =  $request->nombreDePlatillo;
        $menu->descripcionDePlatillo = $request->descripcionDePlatillo;
        $menu->fotoDePlatillo = $request->fotoDePlatillo;
        $menu->precio = $request->precio;
        $menu->disponible = $request->disponible;
        $result = $menu->save();
        if($result){
            echo "Se guardo con exito";
        }
        else{
            echo "No se guardo";
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //Obtener lo que es un registro en especifico con un parametro
        /*$dataAlumnos = DB::table('alumnos')->where('numeroDeControl', $request->numeroDeControl)->get();
        return $dataAlumnos;*/
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //Actualizar alumno mediante su número de control
        /*$result = DB::table('Alumnos')->where('numeroDeControl', $request->numeroDeControl)
                ->update(['nombres' => $request->nombres, 'apellidoPaterno' => $request->apellidoPaterno, 
                        'apellidoMaterno' => $request->apellidoMaterno, 'claveCarrera' => $request->claveCarrera, 
                        'becaAlimenticia' => $request->becaAlimenticia]);
        if($result){
            echo "Se actualizo correctamente";
        }
        else{
            echo "No se actualizo el registro";
        }*/
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //Borrar alumnos mediante el número de control
        /*$result = DB::table('alumnos')->where('numeroDeControl', $request->numeroDeControl)->delete();
        if($result){
            echo "Se borro correctamente el registro";
        }
        else{
            echo "No se encontró el registro";
        }*/
    }
}
