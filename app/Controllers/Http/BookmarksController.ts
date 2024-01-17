import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bookmark from 'App/Models/Bookmark'
import { GoogleAPIService } from 'App/Services/GoogleAPIService'

export default class BookmarksController {
  public async index({ auth, request }: HttpContextContract) {
    const { page = 1, limit = 10 } = request.qs()

    const bookmarks = await Bookmark.query()
      .where({ userId: auth.user?.id })
      .orderBy('id')
      .paginate(page, limit)

    const service = new GoogleAPIService()

    const bookmarksWithBookDetails = await Promise.all(
      bookmarks.map(async (bookmark) => {
        try {
          const book = await service.getBookById(bookmark.bookId)

          return {
            ...bookmark.$attributes,
            title: book.volumeInfo?.title,
            authors: book.volumeInfo?.authors,
            description: book.volumeInfo?.description,
          }
        } catch (error) {
          console.error(`Error fetching details for bookmark ${bookmark.id}:`, error)
          return null
        }
      })
    )

    return {
      data: bookmarksWithBookDetails,
      meta: {
        total: bookmarks.total,
        per_page: bookmarks.perPage,
        current_page: bookmarks.currentPage,
        last_page: bookmarks.lastPage,
        first_page: bookmarks.firstPage,
        next_page_url: bookmarks.getNextPageUrl(),
        previous_page_url: bookmarks.getPreviousPageUrl(),
      },
    }
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
    } catch (error) {
      if (error.sqlMessage) {
        throw new Exception(error.sqlMessage, 422)
      } else {
        throw new Exception('Book is not found', 404)
      }
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
