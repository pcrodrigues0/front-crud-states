
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'states',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/form-state',
        name: 'formState',
        component: () => import('pages/FormState.vue'),
        props: true
      },
      {
        path: '/cities',
        name: 'cities',
        component: () => import('pages/cities.vue')
      },
      {
        path: '/form-cities',
        name: 'formCities',
        component: () => import('pages/FormCities.vue'),
        props: true
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
