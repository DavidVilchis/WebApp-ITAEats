<?php

namespace App\Http\Controllers;

use App\Models\Alumnos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlumnosController extends Controller
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
        return Alumnos::all();
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
        $alumnos = new Alumnos;
        $alumnos->numeroDeControl = $request->numeroDeControl;
        $alumnos->nombres =  $request->nombres;
        $alumnos->apellidoPaterno = $request->apellidoPaterno;
        $alumnos->apellidoMaterno = $request->apellidoMaterno;
        $alumnos->claveCarrera = $request->claveCarrera;
        $result = $alumnos->save();
        if($result){
            return Alumnos::all();
        }
        else{
            return null;
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
        $dataAlumnos = DB::table('alumnos')->where('numeroDeControl', $request->numeroDeControl)->get();
        return $dataAlumnos;
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
        $result = DB::table('Alumnos')->where('numeroDeControl', $request->numeroDeControl)
                ->update(['nombres' => $request->nombres, 'apellidoPaterno' => $request->apellidoPaterno, 
                        'apellidoMaterno' => $request->apellidoMaterno, 'claveCarrera' => $request->claveCarrera]);
        if($result){
           return Alumnos::all();
        }
        else{
            return null;
        }
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
        $result = DB::table('alumnos')->where('numeroDeControl', $request->numeroDeControl)->delete();
        if($result){
            return Alumnos::all();
         }
         else{
             return null;
         }
    }

    public function iniciarSesion(Request $request){
        $dataAlumnos = DB::table('alumnos')->where('numeroDeControl', $request->numeroDeControl)->get();
        return $dataAlumnos;
    }
    public function searchNombreCompleto(Request $request){
        $dataAlumnos = DB::table('alumnos')
        ->where('nombres', 'like', $request->nombres . '%')
        ->where('apellidoPaterno', 'like', $request->apellidoPaterno . '%')
        ->where('apellidoMaterno', 'like', $request->apellidoMaterno . '%')
        ->get();
        return $dataAlumnos;
    }
}
