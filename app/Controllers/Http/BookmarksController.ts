import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bookmark from 'App/Models/Bookmark'

export default class BookmarksController {
  public async index({ auth }: HttpContextContract) {
    // TODO add pagination
    const bookmarks = await Bookmark.query().where({ userId: auth.user?.id }).preload('user')

    return bookmarks
  }

  public async store({ request, auth }: HttpContextContract) {
    const { bookId } = request.body()

    const bookmark = await Bookmark.firstOrCreate({ bookId, userId: auth.user?.id })

    return {
      bookmark,
      message: bookmark.$isLocal
        ? 'Book has been added to your bookmark list'
        : 'Book is already on your bookmark list',
    }
  }

  public async destroy({ request }: HttpContextContract) {
    const { bookId } = request.body()

    const bookmark = await Bookmark.findByOrFail('bookId', bookId)
    await bookmark.delete()

    return {
      message: 'Book has been removed from your bookmark list',
    }
  }
}
