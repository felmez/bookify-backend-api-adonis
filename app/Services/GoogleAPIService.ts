import Env from '@ioc:Adonis/Core/Env'
import { books_v1, google } from 'googleapis'

export class GoogleAPIService {
  private client: books_v1.Books

  constructor() {
    this.client = google.books({ version: 'v1', auth: Env.get('GOOGLE_API_KEY') })
  }

  public async searchBooks(searchQuery: string, startIndex: number, maxResults: number) {
    const response = await this.client.volumes.list({ q: searchQuery, startIndex, maxResults })

    return response.data
  }

  public async getBookById(bookId: string) {
    const response = await this.client.volumes.get({ volumeId: bookId })

    return response.data
  }
}
