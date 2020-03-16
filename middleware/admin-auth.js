export default function({store, redirect}) {
  store.dispatch('auth/autoLogin')
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/login?message=login')
  }
}
