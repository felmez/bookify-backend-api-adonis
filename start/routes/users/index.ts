import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/profile', 'UsersController.profile')
})
  .prefix('/api/users')
  .middleware(['auth:api'])
