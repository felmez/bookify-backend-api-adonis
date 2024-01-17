import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(RegisterUserValidator)

    const user = await User.firstOrCreate({ email, password })

    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    })

    return token.toJSON()
  }

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginUserValidator)

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
