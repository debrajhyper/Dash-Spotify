import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { Provider } from 'react-redux';
import { spotifyStore } from './context/spotifyStore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={spotifyStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
