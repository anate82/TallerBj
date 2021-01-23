# TallerBj

_  Esta es una web de gestion de un taller de chapa y pintura. El cliente va a poder acceder a sus vehículos que estan en reparación en el taller y visualizar todo el proceso de la reparacion, mediante noticaciones y un log de proceso. En este log podrá ver comentarios del taller y el cliente podrá añadir comentarios a estos. El administrador será el que añada los vehículos a cada usuario y sus reparaciones. Podrá visualizar la informacion necesaria para su gestion (todos los vehículos que han entrado en taller, todas las reparaciones, usuarios nuevos, etc..._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Realiza un fork en nuestro proyecto y tendrás una copia en tu cuenta, a partir de ese momento podras realizar las modificaciones y mejoras que desees.


### Pre-requisitos 📋

_Necesitas un navegador tipo google Chrome, Mozilla Firefox_

## Construido con 🛠️

_JavaScript, Node, Html5 y css3_

* [visual Code]- El entorno para programar usado
* [MongoAtlas] - Base de datos
* [Heroku] -
* [Node] -
* [Express] - 
* [Ubuntu] - Sistema operativo

## Modelo de Datos

[Usuarios]
Nombre:String
Apellidos:String
Dni:String
Telefono:Int32
Alias: String
Contraseña:String
Rol: String
Vehículo: Array ObjectId

[Vehículos]
Usuario: ObjectId Usuario
Reparaciones: Array ObjectId Reparaciones
Marca: String
Modelo: String
Numero_bastidor: String
Matricula: String
Kilometraje: Int32
Anno: Int32
Ref_Pintura: Object{
  Ref_color: String,
  Variante: String
}

[Reparacion]
Usuario: ObjectId Usuario,
Vehiculo: ObjectId Vehiculo
Presupuesto: Object {
Fecha_creacion:Date,
Tipo:String,
Descripcion:String,
Relacion_piezas: Array String,
Horas_desmonte:Int32,
Horas_reparacion:Int32,
Pintura:Int32,
Auxiliares:String,
Precio:Int32,
Aceptado:Boolean
},
Fecha_entrada: Date
Fecha_salida: Date
Seguro: String
Proceso_reparacion: Array Object{
Leido:Boolean,
Fecha_taller:Date,
Comentario_taller:String,
Fecha_cliente:Date,
Comentario_cliente:String,
Foto:String
} 

[Comentarios]
Usuario: ObjectId Usuario
Fecha_creacion:Date
Comentario: String
Publicar:Boolean
Puntuacion:Int32




## Autor ✒️

* **Ana Angulo** - *Programadora (programacion, diseño y analisis)* - [anate82](https://github.com/anate82)

## Licencia 📄

Este proyecto está bajo la Licencia (MIT License) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Mis profesores, geniales 📢
