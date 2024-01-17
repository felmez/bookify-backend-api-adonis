import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'BooksController.index')
})
  .prefix('/api/books')
  .middleware(['auth:api'])
