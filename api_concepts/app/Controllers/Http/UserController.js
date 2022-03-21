'use strict'

const User = use('App/Models/User')

class UserController {

    async create({request, response}){

        const {username, email, password} = request.body
        const user =  {
            username,
            email,
            password
        }
        await User.create(user)
        return  response.status(201).json(user)
    }

    async index({response}){

        const users = await User.all()

        return response.status(200).json({users})

    }
    
}

module.exports = UserController
