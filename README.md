# Prueba de rangos
El proyecto fue configurado para poder ser usado como el framework de next.js
Se incorporaron las librerias de axios, jest, redux, json-server

# Apis
Se utilizo la pagina mockable para las llamadas de las pero tambien se puede trabajar
con json server dentro de la siguien estructura

/components
    Range.js

vamos encontrar las variables

  const NORMAL_RANGE_URL = 'http://demo5589640.mockable.io/range';
  const FIXED_VALUES_URL = 'http://demo5589640.mockable.io/rangeValues';

se sugire crear esas url, en caso de querer usar las de json-server comentar esas y descomentar las otras
para los test donde se prueba la api es la misma situacion

# Para levantar el proyecto
````
npm i 
````

````
npm run dev 
````
