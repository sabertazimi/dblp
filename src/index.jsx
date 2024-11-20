import { createRoot } from 'react-dom/client'

import configureStore from './store'

const store = configureStore()

setTimeout(() => {
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}, 1500)
