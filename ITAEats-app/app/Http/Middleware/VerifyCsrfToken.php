<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'http://localhost/WebApp-ITAEats/ITAEats-app/public/nuevoAlumno',
        'http://localhost/WebApp-ITAEats/ITAEats-app/public/eliminarAlumno',
        'http://localhost/WebApp-ITAEats/ITAEats-app/public/actualizarAlumno'
    ];
}
