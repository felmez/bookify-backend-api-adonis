import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GoogleAPIService } from 'App/Services/GoogleAPIService'

export default class BooksController {
  public async index({ request }: HttpContextContract) {
    const { query: text, page = 1, limit = 10 } = request.qs()

    const startIndex = (page - 1) * limit

    // TODO add separate author, title search if enough time

    const service = new GoogleAPIService()
    const data = await service.searchBooks(text, startIndex, limit)

    return {
      data: data.items,
      meta: {
        totalItems: data.totalItems,
        page,
        limit,
      },
    }
  }
}
