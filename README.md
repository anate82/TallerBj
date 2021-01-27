# TallerBj

_  Esta es una web de gestion de un taller de chapa y pintura. El cliente va a poder acceder a sus vehículos que estan en reparación en el taller y visualizar todo el proceso de la reparacion, mediante noticaciones y un log de proceso. En este log podrá ver comentarios del taller y el cliente podrá añadir comentarios a estos. El administrador será el que añada los vehículos a cada usuario y sus reparaciones. Podrá visualizar la informacion necesaria para su gestion (todos los vehículos que han entrado en taller, todas las reparaciones, usuarios nuevos, etc..._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Realiza un fork en nuestro proyecto y tendrás una copia en tu cuenta, a partir de ese momento podras realizar las modificaciones y mejoras que desees.
`npm install`


### Pre-requisitos 📋

_Necesitas un navegador tipo google Chrome, Mozilla Firefox_

## Construido con 🛠️


* [NodeJS]
* [HTML5]
* [CSS3]
* [Express]
* [Mongoose]
* [MongoDB] 
* [Bootstrap] 
* [Axios]

## Esquemas Base de datos

## Users
 ---------------------------------------------------------------------
| KEY        | TYPE           | REFERENCE | REQUIRED | VALIDATION     |
|------------|----------------|-----------|----------|----------------|
| name       | string         |           | YES      |                |
| surname    | string         |           | YES      |                |
| dni        | string         |           | YES      | Unique         |
| phone      | number         |           | YES      |                |
| alias      | string         |           | NO       | Default        |
| email      | string         |           | YES      | RegExp Unique  |
| password   | string         |           | YES      |                |
| role       | string         |           | NO       | Enum Default   |
| cars       | Array ObjectID | cars      | NO       |                |
| comments   | Array ObjectID | comments  | NO       |                |


## Cars
 -------------------------------------------------------------------------
| KEY         | TYPE              | REFERENCE | REQUIRED | VALIDATION     |
|-------------|-------------------|-----------|----------|----------------|
| user        | ObjectId          | users     | YES      |                |
| repairs     | Array ObjectID    | repairs   | NO       |                |
| brand       | string            |           | YES      |                |
| car_model   | string            |           | YES      |                |
| frame_number| string            |           | YES      | Unique         |
| reg_veh     | string            |           | YES      | Unique         |
| kilometers  | number            |           | NO       |                |
| year        | number            |           | NO       |                |
| ref_paint   | Object{           |           | No       |                |
|             |  ref_color:string,|           |          |                |
|             |  variant: string} |           |          |                |

## Repairs
 ------------------------------------------------------------------------------
| KEY           | TYPE                 | REFERENCE | REQUIRED | VALIDATION     |
|---------------|----------------------|-----------|----------|----------------|
| user          | ObjectId             | users     | YES      |                |
| car           | ObjectID             | cars      | YES      |                |
| budget        | Object {             |           | NO       |                |
|               | date_create:Date     |           |          |                |
|               | type:string          |           |          |                |
|               | description:string   |           |          |                |
|               | pieces:array string  |           |          |                |
|               | hours_disas:number   |           |          |                |
|               | hours_repare:number  |           |          |                |
|               | paint: number        |           |          |                |
|               | auxiliary:string     |           |          |                |
|               | price: number        |           |          |                |
|               | accepted: boolean    |           |          |                |
| date_in       | date                 |           | YES      |                |
| date_out      | date                 |           | NO       |                |
| secure        | string               |           | YES      |                |
| process_repair| Array Object{        |           | YES      |                |
|               | readed:boolean       |           |          |                |
|               | date_pro: date       |           |          |                |
|               | comment_pro:string   |           |          |                |
|               | date_client:date     |           |          |                |
|               | comment_client:string|           |          |                |
|               | photo:string }       |           |          |                |

## Comments
 ------------------------------------------------------------------------------
| KEY           | TYPE                 | REFERENCE | REQUIRED | VALIDATION     |
|---------------|----------------------|-----------|----------|----------------|
| user          | ObjectId             | users     | YES      |                |
| date_create   | Date                 |           | NO       | Default        |
| comment       | string               |           | YES      | Maxlength      |
| public        | boolean              |           | NO       | Default        |
| puntuation    | number               |           | YES      |                |

## Api Routes

## Autenticacion

| METHOD | URL            | AUTH  | FUNCTION               |
|--------|----------------|-------|------------------------|
| POST   | '/auth/signup' | YES   | Crear una nueva cuenta |
| POST   | '/auth/login'  | NO    | Autentica al usuario   |

## Usuarios

| METHOD | URL                                        | AUTH | FUNCTION                                                                 |
|--------|--------------------------------------------|------|--------------------------------------------------------------------------|
| GET    | '/users                                    | YES  | Mostrar todos los usuarios (admin)                                       |
| GET    | '/users/me'                                | YES  | Mostrar usuario determinado de la base de datos                          |
| PUT    | '/users/me'                                | YES  | Modifica datos usuario determinado de la base de datos                   |
| DELETE | '/users/me'                                | YES  | Elimina usuario determinado de la base de datos(admin)                   |
| PUT    | '/users/me/password'                       | YES  | Modifica contraseña usuario determinado de la base de datos              |
| GET    | '/users/me/cars'                           | YES  | Mostrar todos los coches para usuario determinado                        |
| POST   | '/users/me/cars'                           | YES  | Crear coche para usuario determinado                                     |
| GET    | '/users/me/cars/:carId'                    | YES  | Mostrar coche determinado para usuario determinado                       |
| DELETE | '/users/me/cars/:carId'                    | YES  | Elimina un coche determinado para usuario determinado                    |
| PUT    | '/users/me/cars/:carId'                    | YES  | Actualiza la informacion de un coche determinado para usuario determinado|
| GET    | '/users/me/cars/:carId/repairs'            | YES  | Mostrar todas las reparaciones de un coche para usuario determinado      |
| POST   | '/users/me/cars/:carId/repairs'            | YES  | Crear reparacion de un coche para usuario determinado                    |
| GET    | '/users/me/cars/:carId/repairs/:repairId'  | YES  | Mostrar una reparacion determinada de un coche para usuario determinado  |
| DELETE | '/users/me/cars/:carId/repairs/:repairId'  | YES  | Elimina una reparacion determinada de un coche para usuario determinado  |
| PUT    | '/users/me/cars/:carId/repairs/:repairId'  | YES  | Actualiza una reparacion determinada de un coche para usuario determinado|
| GET    | '/users/me/cars/:carId/notification'       | YES  | Mostrar todas las notificaciones de un coche para usuario determinado    |
| POST   | '/users/me/cars/:carId/notification'       | YES  | Crear notificacion de un coche para usuario determinado(admin)           |


## Vehiculos

| METHOD | URL                              | AUTH | FUNCTION                                                                 |
|--------|----------------------------------|------|--------------------------------------------------------------------------|
| GET    | '/cars                           | YES  | Mostrar todos los vehiculos (admin)                                      |
| POST   | '/cars                           | YES  | Crear un vehiculo                                                        |
| GET    | '/cars/:carId'                   | YES  | Mostrar vehiculo determinado de la base de datos                         |
| DELETE | '/cars/:carId'                   | YES  | Elimina vehiculo determinado de la base de datos                         |
| PUT    | '/cars/:carId'                   | YES  | Actualiza vehiculo determinado de la base de datos                       |
| GET    | '/cars/:carId/repairs'           | YES  | Mostrar todos los reparaciones para un vehículo determinado              |
| POST   | '/cars/:carId/repairs'           | YES  | Crear nueva reparacion para un vehículo determinado                      | 
| PUT    | '/cars/:carId/repairs/:repairId' | YES  | Actualiza una reparacion de un vehículo determinado                      |
| GET    | '/cars/:carId/repairs/:repairId' | YES  | Obtiene una reparacion determinada de un vehículo determinado            |



## Reparaciones

| METHOD | URL                   | AUTH | FUNCTION                                                                 |
|--------|-----------------------|------|--------------------------------------------------------------------------|
| GET    | '/repairs             | YES  | Mostrar todos las reparaciones (admin)                                   |
| POST   | '/repairs'            | YES  | Crear una reparacion                                                     |
| GET    | '/repairs/:repairId'  | YES  | Mostrar una determinada reparacion                                       |
| DELETE | '/repairs/:repairId'  | YES  | Elimina una determinada reparacion                                       |
| PUT    | '/repairs/:repairId'  | YES  | Actualiza una determinada reparacion                                     |

## Comentarios

| METHOD | URL                   | AUTH | FUNCTION                                                                 |
|--------|-----------------------|------|--------------------------------------------------------------------------|
| GET    | '/reviews             | YES  | Mostrar todos los comentarios                                            |
| POST   | '/reviews'            | YES  | Crear un nuevo comentario                                                |
| GET    | '/reviews/:reviewId'  | YES  | Mostrar un determinado comentario de la base de datos                    |
| DELETE | '/reviews/:reviewId'  | YES  | Eliminar un determinado comentario de la base de datos                   |
| PUT    | '/reviews/:reviewId'  | YES  | Actualiza un determinado comentario de la base de datos                  |


## Autor ✒️

* **Ana Angulo** - *Desarrolladora (Análisis, diseño y desarollo)* - [anate82](https://github.com/anate82)

## Licencia 📄

Este proyecto está bajo la Licencia (MIT License) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

<<<<<<< HEAD
* Mis profesores, geniales 📢
=======
* Mis profesores, geniales 📢
>>>>>>> 658cbbd60e1eed1e48f9b012986d5b91ede6ce69
