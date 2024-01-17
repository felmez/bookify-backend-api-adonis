import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async profile({ auth }: HttpContextContract) {
    return auth.user
  }
}
