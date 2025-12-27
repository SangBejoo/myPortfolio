'use client'

import { useState, useEffect } from 'react'

interface TypingEffectProps {
  phrases: string[]
  speed?: number
  delayBetweenPhrases?: number
}

export function TypingEffect({ phrases, speed = 100, delayBetweenPhrases = 2000 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    let charIndex = 0

    if (isTyping) {
      const typingTimer = setInterval(() => {
        if (charIndex < currentPhrase.length) {
          setDisplayedText(currentPhrase.substring(0, charIndex + 1))
          charIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingTimer)
        }
      }, speed)

      return () => clearInterval(typingTimer)
    } else {
      const delayTimer = setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setDisplayedText('')
        setIsTyping(true)
      }, delayBetweenPhrases)

      return () => clearTimeout(delayTimer)
    }
  }, [isTyping, currentPhraseIndex, phrases, speed, delayBetweenPhrases])

  return <span>{displayedText}</span>
}
