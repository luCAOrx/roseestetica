import React, { createContext, useContext, useState } from 'react'
import { SuccessScreen } from '../components/SucessScreen'

interface SuccessScreenProps {
  handleShowSuccessMessage: (showSuccessMessage: boolean) => void
  handleTitleSuccessMessage: (titleSuccessMessage: string) => void
}

const SuccessScreenContext = createContext<SuccessScreenProps>(
  {} as SuccessScreenProps
)

export const SuccessScreenProvider: React.FC = ({ children }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [titleSuccessMessage, setTitleSuccessMessage] = useState('')

  function handleShowSuccessMessage(showSuccessMessage: boolean) {
    setShowSuccessMessage(showSuccessMessage)
  }

  function handleTitleSuccessMessage(titleSuccessMessage: string) {
    setTitleSuccessMessage(titleSuccessMessage)
  }

  return (
    <SuccessScreenContext.Provider
      value={{ handleShowSuccessMessage, handleTitleSuccessMessage }}
    >
      {children}
      <SuccessScreen title={titleSuccessMessage} show={showSuccessMessage} />
    </SuccessScreenContext.Provider>
  )
}

export function useSuccessScreen() {
  const context = useContext(SuccessScreenContext)

  return context
}
