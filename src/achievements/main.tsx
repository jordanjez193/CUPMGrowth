import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { AchievementsApp } from './AchievementsApp'

ReactDOM.createRoot(document.getElementById('achievements-root')!).render(
  <React.StrictMode>
    <AchievementsApp />
  </React.StrictMode>
)
