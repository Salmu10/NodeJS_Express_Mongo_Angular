<h1>SaleBack</h1>

<p style="text-align: justify">Bienvenidos a SaleBack.<br>
  
Un proyecto realizado por el alumno <a href="https://github.com/Salmu10">Salva Muñoz Úbeda</a> en el 1er curso de DAW en el <a href="https://portal.edu.gva.es/iestacio/">IES L'estació</a>.<br>
  
Este proyecto trata sobre una página web de venta de productos de segunda mano, al estilo wallapop,<br> sobre la cual se pueden realizar distintas funciones.</p>
<hr>
  
<h2>FUNCIONES</h2>
 
<p>La web contiene un total de 4 secciones.<p>
  
<h3>Home</h3>
<p>En la sección del Home, el usuario tiene su primera impresión de la web, el cual puede observar<br>
un carrusel de las categorias que dispone la página, y filtar por ellas los productos.<br>
Además, contiene un infinite scroll de la lista de las categorias de la empresa.<br>
Ambas opciones, tienen un salto al módulo de shop aplicando el filtro de la categoría seleccionada</p>
<ul>
  <li>Carrusel de categorias</li>
  <li>Infinite scroll de categorías</li>
</ul>

<h3>Search</h3>
<p>El módulo de search, esta presente tanto en el home como en el shop de la aplicación. En él, se puede<br>
buscar el producto deseado por su nombre. Este motor de búsqueda, redirige a la sección del shop,<br>
aplicando el filtro deseado.</p>

<h3>Login</h3>
<p>La aplicación web, consta también, de un módulo de login donde el usuario puede crear una cuenta, e<br> iniciar sesión con ella. Consta además, de una sección de perfil, donde el usuario puede ver sus<br> productos y los productos a los que les ha dado like. También tiene una opción de ajustes, donde puede<br>
puede modificar la información de su perfil.</p>
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
<ul>
  <li>cd server</li>
  <li>npm install</li>
  <li>npm run dev</li>
</ul>

<h3>FRONTEND</h3>
<ul>
  <li>cd cliente</li>
  <li>npm install</li>
  <li>npm start</li>
</ul>

<hr>

<h2>LIBRERÍAS</h2>

<p>Lista de librerías utilizadas en este proyecto:</p>

<ul>
  <li><a href="https://codeseven.github.io/toastr/">Toastr</a></li>
  <li><a href="https://fontawesome.com/">Font Awesome</a></li>
  <li><a href="https://www.flaticon.es/">Flaticon</a></li>
  <li><a href="https://avatars.dicebear.com/">DiceBear Avatars</a></li>
</ul>
 
