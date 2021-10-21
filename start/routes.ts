/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import axios from 'axios'

Route.get('/', async () => {
  return { hello: 'world' }
})


// Register to create a new user.
Route.post('register', async ({ request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const user = new User();
    user.email = email;
    user.password = password;

    user.save();
    return user;
  } catch {
    return response.badRequest('Invalid data provided')
  }
})

// Login and generate a token.
Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch {
    return response.badRequest('Invalid credentials')
  }
})

// Get the list of users.
Route.get('users', async ({ response }) => {
  
  try {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      response.badRequest(error)
    })
  } catch {
    return response.badRequest('Invalid credentials')
  }
}).middleware('auth')

// Get a specific user by id.
Route.get('users/:id', async ({params, response }) => {
  const id = params.id
  try {
    return axios.get('https://jsonplaceholder.typicode.com/users/'+id)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      response.badRequest(error)
    })
  } catch {
    return response.badRequest('Invalid credentials')
  }
}).middleware('auth')

