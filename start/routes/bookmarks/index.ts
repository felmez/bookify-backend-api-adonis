import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'BookmarksController.index')
})
  .prefix('/api/bookmarks')
  .middleware(['auth:api'])
