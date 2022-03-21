'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArquivosSchema extends Schema {
  up () {
    this.create('arquivos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('arquivos')
  }
}

module.exports = ArquivosSchema
