'use strict'

const User = use('App/Models/User')
const {validateAll} = use('Validator')

class UserController {

    async create({request, response}){
        try {
            const errorMessage ={
                'username.required':'Esse campo é obrigatorio',
                'username.unique':'Já existe um usuario com este nome',
                'username.min':'O username deve ter pelo menos 5 caracteres',
            }

            const validation = await validateAll(request.all(),{
                username:'required|min:5|unique:users',
                email:'required|email|unique:users',
                password:'required|min:6',
              }, errorMessage)

              if(validation.fails()){
                  return response.status(401).send({message:validation.messages()})
              }

            const data =  request.only(["username", "email", "password"])      
            const user= await User.create(data)       
            return  user
        } 
        catch (err) {
           return response.status(500).send({error:`Erro : ${err.message}`})            
        }      
    }

async login({ request, response, auth }){
    try {
        const {email, password} = request.all()
        const validateToken = await auth.attempt(email, password)
        return validateToken
        
    } catch (err) {
        return response.status(500).send({error:`Erro : ${err.message}`})     
        
    }
}

    async index({response}){
        const users = await User.all()
        return response.status(200).json({users})
    }
    async delete ({request, response}){
        const {id} = request.params 
        const deleteUser = await User.find(id)
        await deleteUser.delete()
        return response.status(200).send("User deleted")
    }
    
}

module.exports = UserController
