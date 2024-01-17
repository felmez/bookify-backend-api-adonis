import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    // TODO add validation if enough time
    const { email, password } = request.body()

    const user = await User.firstOrCreate({ email, password })

    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    })

    return token.toJSON()
  }

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.body()

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 days',
    })

    return token.toJSON()
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      message: 'See you later!',
    }
  }
}
