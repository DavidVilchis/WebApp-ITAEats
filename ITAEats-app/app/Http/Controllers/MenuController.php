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
        $result = $menu->save();
        $response['success'] = true;
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $dataMenu = DB::table('menu')->where('idDePlatillo', $request->idDePlatillo)->get();
        return $dataMenu;
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
        $result = DB::table('menu')->where('idDePlatillo', $request->idDePlatillo)
                ->update(['nombreDePlatillo' => $request->nombreDePlatillo, 'descripcionDePlatillo' => $request->descripcionDePlatillo, 
                        'fotoDePlatillo' => $request->fotoDePlatillo, 'precio' => $request->precio]);
        if($result){
            $response['success'] = true;
        }
        else{
            $response['success'] = false;
        }
        return $response;
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
        $result = DB::table('menu')->where('idDePlatillo', $request->idDePlatillo)->delete();
        if($result){
            $response['success'] = true;
        }
        else{
            $response['success'] = false;
        }
        return $response;
    }
}
