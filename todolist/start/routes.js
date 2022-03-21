'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.on('/').render('home')
Route.on('/add').render('add')
Route.get('/tasks', 'TaskController.index')
Route.get('/task/:id', 'TaskController.detail')
Route.delete('/remove/:id', 'TaskController.remove')
Route.post ('/add', 'TaskController.store')

