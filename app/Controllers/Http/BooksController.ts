import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GoogleAPIService } from 'App/Services/GoogleAPIService'
import SearchBookValidator from 'App/Validators/SearchBookValidator'

export default class BooksController {
  public async index({ request }: HttpContextContract) {
    const {
      query,
      page = 1,
      limit = 10,
      title,
      author,
      keyword,
    } = await request.validate(SearchBookValidator)

    const startIndex = (page - 1) * limit
    const searchQuery =
      query +
      (title ? `+intitle:${title}` : '') +
      (author ? `+inauthor:${author}` : '') +
      (keyword ? `+subject:${keyword}` : '')

    const service = new GoogleAPIService()
    const data = await service.searchBooks(searchQuery, startIndex, limit)

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
