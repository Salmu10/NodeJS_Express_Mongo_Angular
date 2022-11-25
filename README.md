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

<p>Como en el contenedor anterior, en el contenedor de frontend también tendremos que crear un dockerfile con dos stages configurando el contnedor. Esta vez, exponemos el puerto 4200.</p>

<img src="images/frontend_1.png">

<p>Una vez creado el dockerfile, crearemos el contenedor en el docker-compose.yml, el cual se iniciará después del contenedor de backend,
esta vez, el comando de arranque lo ejecuta el dockerfile así que no hará falta ponerlo en el docker-compose.yml. Además, tendrá que estar 
en la misma red que el contenedor que el resto de contenedores.</p>

<img src="images/frontend_2.png">

<h3>CONTENEDOR MONGO-EXPRESS</h3>

<p>Este contenedor nos permitirá administrar la base de datos de mongo. En el solo tendremos que asignar la
imagen que utilizará, el puerto que usará y que arrancará después del contenedor de mongo. Además, de añadirlo a la misma red que el resto de contenedores.</p>

<img src="images/mongo_express_1.png">

<p>En un archivo aparte deberemos añadir las variables de entorno que necesita el contenedor para funcionar, este archivo será un .env y estará en la carpeta general. Se llamará a este archivo desde el docker-compose.</p>

<img src="images/mongo_express_2.png">

<h3>CONTENEDOR LOADBALANCER</h3>

<p>El siguiente contenedor nos permitirá implementar un sistema de balanceo de carga/proxy en nuestro sistema. Partirá de la imagen oficial de nginx y asociará un fichero de configuración de nginx que se encontrará en la carpeta de loadbalancer con el mismo fichero de la carpeta /etc/nginx/ de la imagen lo que permitirá implementar el balanceador de carga. Además, el contenedor ejecutará el comando "nginx -g daemon off" nada más arrancar.</p>

<img src="images/loadbalancer.png">

<h3>CONTENEDOR PROMETHEUS</h3>

<p>En este contenedor podremos recoger métricas de la aplicación en tiempo real. Editaremos el server.js ed nuestro backend adecuandolo al contenedor de prometheus
y crearemos el contenedor de este en el docker-compose.yml. Para ello, deberemos instalar la dependencia de prom-client en el backend.</p>

<img src="images/prometheus.png">

<h3>CONTENEDOR GRAFANA</h3>

<p>Este último contenedor nos permitirá graficar todas las métricas creadas por el servicio Prometheus. Arrancará en el puerto 3500 y arrancará después del contenedor de prometheus.
Además, tendremos que añadir las variables de entorno necesarias para su funcionamiento en el archivo .env creado previamente.</p>

<img src="images/grafana.png">

<hr>

<h2>PUESTA EN MARCHA</h2>

<p>Para arrancar y los contenedores, desde la carpeta del proyecto, ejecutaremos el comando "docker compose up --build".</p>

<h3>Lista de URLs</h3>
<ul>
  <li>Frontend: <a href="http://localhost:4200">http://localhost:4200.</a></li>
  <li>Backend: <a href="http://localhost:3000/api/products">http://localhost:3000/api/products.</a></li>
  <li>Panel de mongo-express: <a href="http://localhost:8081">http://localhost:8081.</a></li>
  <li>Frontend con loadbalancer activado: <a href="http://localhost:8080">http://localhost:8080.</a></li>
  <li>Backend con loadbalancer activado: <a href="http://localhost:8080/api/products">http://localhost:8080/api/products.</a></li>
  <li>Panel de Prometheus: <a href="http://localhost:9090">http://localhost:9090.</a></li>
  <li>Panel de Grafana: <a href="http://localhost:8080/api/products">http://localhost:8080/api/products.</a></li>
</ul>