import React, { createContext, useContext, useState, useEffect } from 'react'

export const MetronicSplashScreenContext = createContext()

export function MetronicSplashScreenProvider ({ children }) {
  // let visible = count > 0
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const splashScreen = document.getElementById('splash-screen')

    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove('hidden')

      return () => {
        splashScreen.classList.add('hidden')
      }
    }

    // Hide SplashScreen
    let timeout
    if (splashScreen && !visible) {
      timeout = setTimeout(() => {
        splashScreen.classList.add('hidden')
      }, 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [visible])

  return (
    <MetronicSplashScreenContext.Provider value={setVisible}>
      {children}
    </MetronicSplashScreenContext.Provider>
  )
}

export function LayoutSplashScreen ({ visible = true }) {
  // Everything are ready - remove splashscreen
  const setCount = useContext(MetronicSplashScreenContext)

  useEffect(() => {
    if (!visible) {
      return
    }

    setCount(prev => {
      return prev + 1
    })

    return () => {
      setCount(prev => {
        return prev - 1
      })
    }
  }, [setCount, visible])

  return null
}
