import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async profile({ auth }: HttpContextContract) {
    const user = auth.user

    await user?.load('bookmarks')

    return user
  }
}
