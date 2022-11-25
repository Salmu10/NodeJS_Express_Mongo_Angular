<h1>DOCKER COMPOSE</h1>

<p style="text-align: justify">Dockerización del proyecto de NodeJs/Angular13.<br>
  
Un proyecto realizado por el alumno <a href="https://github.com/Salmu10">Salva Muñoz Úbeda</a> en el 1er curso de DAW en el <a href="https://portal.edu.gva.es/iestacio/">IES L'estació</a>.<br>
  
Este proyecto trata sobre una página web de venta de productos de segunda mano, al estilo wallapop,<br> sobre la cual se pueden realizar distintas funciones.</p>
<hr>
  
<h3>CONTENEDOR MONGO</h3>
 
<p>Para el contenedor de la base de datos, que en este caso es mongodb, primeramente, hacemos 
una copia de la base de datos usada en el proyecto, para ello, usamos el comando "mongodump -d <database name> -o <target directory>"
guardaremos esta carpeta de nuestra base de datos en una carpeta llamada "dump" que a su vez se encontrará en la carpeta de mongo.
Además, crearemos un fichero .sh con el comando "mongorestore -d <database name> /dump" para insertar nuestra base de datos en el 
contenedor de mongo.<p>

<p>Solo nos quedará terminar de configurar el contenedor de mongo, agregando la red (practica_net), los puertos, etc.
El resultado será parecido al siguiente:</p>

<img src="images/mongo_1.png">

<h3>CONTENEDOR BACKEND</h3>

<p>Para el contenedor de backend, primero, deberemos crear un fichero dockerfile dentro de la carperta de backend en el qual, partiendo 
de una imagen "node:19-alpine", haremos dos stages estructurando el contenedor y exponiendo el pureto 3000.</p>

<img src="images/backend_1.png">

<p>Una vez creado el dockerfile, crearemos el contenedor en el docker-compose.yml, el cual se iniciará después del contenedor de mongo y 
ejecutará el comando que inicia el servidor. Además, tendrá que estar en la misma red que el contenedor de mongo y el resto de contenedores.</p>

<img src="images/backend_2.png">

<h3>CONTENEDOR FRONTEND</h3>

<p>Como en el contenedor anterior, en el contenedor de frontend también tendremos que crear un dockerfile con dos stages configurando el 
contnedor. Esta vez, exponemos el puerto 4200.</p>

<img src="images/frontend_1.png">

<p>Una vez creado el dockerfile, crearemos el contenedor en el docker-compose.yml, el cual se iniciará después del contenedor de backend,
esta vez, el comando de arranque lo ejecuta el dockerfile así que no hará falta ponerlo en el docker-compose.yml. Además, tendrá que estar 
en la misma red que el contenedor que el resto de contenedores.</p>

<img src="images/frontend_2.png">

<ul>
  <li>Register</li>
  <li>Login</li>
  <li>Profile</li>
  <li>Settings</li>
</ul>
<p>Además el login tiene un token mediante JWT en el que va verificando durante el uso de la web si hay<br>
un usuario conectado.</p>
 
<h3>Shop</h3>
<p>Este es el módulo más importante de toda la web, en el se puede ver la lista de productos del que dispone la<br>
web y además se puede filtrar esta lista y la lista se encuentra paginada. También puede entrar en el<br>
producto deseado y ver una lista mas detallada de este, además, el usuario puede añadir algún comentario<br>
al producto y, en caso de que sea suyo, eliminarlo. También hay una opción de marcado de favoritos de<br> cada producto si el usuario se encuentra logeado.</p>
<ul>
  <li>Lista de productos</li>
  <li>Filtros</li>
  <li>Detalles del producto</li>
  <li>Likes</li>
  <li>Paginación</li>
  <li>Comentarios</li>
</ul>

<hr>

<h2>PUESTA EN MARCHA</h2>

<p>Es necesario crear el fichero .env en la carpeta de servidor.</p>
<p>Tener instalado las siguientes herramientas:<br>

- NodeJS V16.17.0<br>
- Angular V13<br>
- MongoDB</p>

<h3>BACKEND</h3>
<ol>
  <li>cd server</li>
  <li>npm install</li>
  <li>npm run dev</li>
</ol>

<h3>FRONTEND</h3>
<ol>
  <li>cd client</li>
  <li>npm install</li>
  <li>npm start</li>
</ol>


<hr>

<h2>LIBRERÍAS</h2>

<p>Lista de librerías utilizadas en este proyecto:</p>

<ul>
  <li><a href="https://codeseven.github.io/toastr/">Toastr</a></li>
  <li><a href="https://fontawesome.com/">Font Awesome</a></li>
  <li><a href="https://www.flaticon.es/">Flaticon</a></li>
  <li><a href="https://avatars.dicebear.com/">DiceBear Avatars</a></li>
</ul>
 
