<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ITAEats - TecNM</title>
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- Linea agregada -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

    </head>
    <body>
       <!-- React root DOM -->
        <div id="index">
        </div>
        <!-- React JS -->
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>
    </body>
</html>