'use strict'

class TaskController {
    index({view}){

        const tasks = [
            {title:"Task one",body:"this is task 1"},
            {title:"Task 2", body:"this is task 2" }
    ]
        return view.render('task',{
            title:"Your tasks",
            tasks:tasks
        })
    }
}

module.exports = TaskController
