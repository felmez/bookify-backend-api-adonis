import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'BookmarksController.index')
  Route.post('/', 'BookmarksController.store')
  Route.delete('/', 'BookmarksController.destroy')
})
  .prefix('/api/bookmarks')
  .middleware(['auth:api'])
