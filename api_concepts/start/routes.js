'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/register' , 'UserController.create').validator('User')
Route.post('/session' , 'UserController.login')
Route.get('/list' , 'UserController.index')
Route.delete('/delete/:id' , 'UserController.delete')
Route.resource('tarefa' , 'TarefaController').apiOnly().middleware('auth')

Route.post('/tarefa/:id/arquivo' , 'ArquivoController.create')

