import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bookmark from 'App/Models/Bookmark'
import { GoogleAPIService } from 'App/Services/GoogleAPIService'

export default class BookmarksController {
  public async index({ auth, request }: HttpContextContract) {
    const { page = 1, limit = 10 } = request.qs()

    // TODO preload some basic book info on query from google api
    const bookmarks = await Bookmark.query()
      .where({ userId: auth.user?.id })
      .preload('user')
      .paginate(page, limit)

    return bookmarks
  }

  public async store({ request, auth }: HttpContextContract) {
    const { bookId } = request.body()

    try {
      const service = new GoogleAPIService()

      await service.getBookById(bookId)

      const bookmark = await Bookmark.firstOrCreate({ bookId, userId: auth.user?.id })

      return {
        bookmark,
        message: bookmark.$isLocal
          ? 'Book has been added to your bookmark list'
          : 'Book is already on your bookmark list',
      }
    } catch {
      throw new Exception('Book is not found', 404)
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
