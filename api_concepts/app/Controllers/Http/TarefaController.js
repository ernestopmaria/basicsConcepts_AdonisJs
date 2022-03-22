'use strict'

const Tarefa =use('App/Models/Tarefa')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tarefas
 */
class TarefaController {
  /**
   * Show a list of all tarefas.
   * GET tarefas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth,request, response }) {

    const tarefa = await Tarefa.query().where('user_id' , auth.user.id).withCount('arquivos as total_arquivos').fetch()

  
    return tarefa
  }


  async store ({ request, response, auth }) {
    const {id} = auth.user
    const data = request.only(["titulo","descrição"])
    const tarefa = await Tarefa.create({...data, user_id: id})

    return tarefa
  }

  /**
   * Display a single tarefa.
   * GET tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth}) {
    const tarefa = await Tarefa.query().where('id', params.id)
    .where('user_id', auth.user.id).first()

    if(!tarefa){
      return response.status(404).send({message: "Nenhum registro encontrado"})
    }await tarefa.load('arquivos')
    return tarefa
  }

  /**
   * Render a form to update an existing tarefa.
   * GET tarefas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tarefa details.
   * PUT or PATCH tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const {titulo, descrição} = request.all()

    const tarefa = await Tarefa.query().where('id', params.id)
    .where('user_id', auth.user.id).first()

    if(!tarefa){
      return response.status(404).send({message: "Nenhum registro encontrado"})
    }

    tarefa.titulo =titulo
    tarefa.descrição = descrição
    tarefa.id = params.id

    await tarefa.save()

    return tarefa
  }

  /**
   * Delete a tarefa with id.
   * DELETE tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response , auth}) {

    const tarefa = await Tarefa.query().where('id', params.id)
    .where('user_id', auth.user.id).first()

    if(!tarefa){
      return response.status(404).send({message: "Nenhum registro encontrado"})
    }
    await tarefa.delete()

    return response.status(200).send("Tarefa deletada")

    
  }
}

module.exports = TarefaController
