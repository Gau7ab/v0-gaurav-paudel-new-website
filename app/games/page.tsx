"use client"

import type React from "react"

import { useState, useEffect, useCallback, Suspense } from "react"
import { EnhancedButton } from "@/components/enhanced-button"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/enhanced-card"
import { Badge } from "@/components/ui/badge"
import { AnimateOnScroll } from "@/components/scroll-animation"
import { GamesSkeleton } from "@/components/loading-states"
import { Gamepad2, Play, Pause, RotateCcw, Zap, Target, Puzzle } from "lucide-react"

// Snake Game Component (keeping existing logic but with enhanced UI)
const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]])
  const [food, setFood] = useState([15, 15])
  const [direction, setDirection] = useState([0, 1])
  const [gameRunning, setGameRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(false)

  const BOARD_SIZE = 20

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]]

      // Check wall collision
      if (head[0] < 0 || head[0] >= BOARD_SIZE || head[1] < 0 || head[1] >= BOARD_SIZE) {
        setGameOver(true)
        setGameRunning(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment[0] === head[0] && segment[1] === head[1])) {
        setGameOver(true)
        setGameRunning(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore((prev) => prev + 10)
        setFood([Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)])
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameRunning, gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return

      switch (e.key) {
        case "ArrowUp":
          if (direction[0] !== 1) setDirection([-1, 0])
          break
        case "ArrowDown":
          if (direction[0] !== -1) setDirection([1, 0])
          break
        case "ArrowLeft":
          if (direction[1] !== 1) setDirection([0, -1])
          break
        case "ArrowRight":
          if (direction[1] !== -1) setDirection([0, 1])
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, gameRunning])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  const startGame = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate loading
    setSnake([[10, 10]])
    setFood([15, 15])
    setDirection([0, 1])
    setScore(0)
    setGameOver(false)
    setGameRunning(true)
    setLoading(false)
  }

  const pauseGame = () => {
    setGameRunning(!gameRunning)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <EnhancedButton onClick={startGame} size="sm" loading={loading}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Game
          </EnhancedButton>
          <EnhancedButton onClick={pauseGame} variant="outline" size="sm" disabled={gameOver}>
            {gameRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </EnhancedButton>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">Score: {score}</Badge>
          {gameOver && <Badge variant="destructive">Game Over!</Badge>}
        </div>
      </div>

      <div className="relative">
        <div
          className="grid border-2 border-primary/20 bg-background mx-auto rounded-lg overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            width: "400px",
            height: "400px",
          }}
        >
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
            const row = Math.floor(index / BOARD_SIZE)
            const col = index % BOARD_SIZE
            const isSnake = snake.some((segment) => segment[0] === row && segment[1] === col)
            const isFood = food[0] === row && food[1] === col
            const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col

            return (
              <div
                key={index}
                className={`border border-muted/20 transition-colors duration-150 ${
                  isSnake
                    ? isHead
                      ? "bg-primary animate-pulse"
                      : "bg-primary/70"
                    : isFood
                      ? "bg-red-500 animate-pulse"
                      : "bg-muted/5"
                }`}
              />
            )
          })}
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">Use arrow keys to control the snake</div>
      </div>
    </div>
  )
}

// Memory Game Component (enhanced with loading states)
const MemoryGame = () => {
  const [cards, setCards] = useState<number[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [loading, setLoading] = useState(false)

  const initializeGame = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate loading
    const numbers = Array.from({ length: 8 }, (_, i) => i + 1)
    const gameCards = [...numbers, ...numbers].sort(() => Math.random() - 0.5)
    setCards(gameCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
    setLoading(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1)

      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched((prev) => [...prev, ...newFlipped])
        setFlipped([])

        if (matched.length + 2 === cards.length) {
          setGameWon(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <EnhancedButton onClick={initializeGame} size="sm" loading={loading}>
          <RotateCcw className="h-4 w-4 mr-2" />
          New Game
        </EnhancedButton>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">Moves: {moves}</Badge>
          {gameWon && <Badge variant="default">You Won! 🎉</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-lg border-2 text-2xl font-bold transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              flipped.includes(index) || matched.includes(index)
                ? "bg-primary text-primary-foreground border-primary transform scale-105"
                : "bg-muted hover:bg-muted/80 border-muted-foreground/20"
            }`}
            disabled={flipped.length === 2 && !flipped.includes(index)}
            aria-label={`Card ${index + 1}, ${flipped.includes(index) || matched.includes(index) ? `showing ${card}` : "hidden"}`}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "?"}
          </button>
        ))}
      </div>
    </div>
  )
}

// Number Guessing Game Component (enhanced)
const NumberGuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [loading, setLoading] = useState(false)

  const startNewGame = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate loading
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess("")
    setAttempts(0)
    setFeedback("")
    setGameWon(false)
    setGameStarted(true)
    setLoading(false)
  }

  const makeGuess = () => {
    const guessNumber = Number.parseInt(guess)
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setFeedback("Please enter a number between 1 and 100")
      return
    }

    setAttempts((prev) => prev + 1)

    if (guessNumber === targetNumber) {
      setFeedback(`🎉 Congratulations! You guessed it in ${attempts + 1} attempts!`)
      setGameWon(true)
    } else if (guessNumber < targetNumber) {
      setFeedback("📈 Too low! Try a higher number.")
    } else {
      setFeedback("📉 Too high! Try a lower number.")
    }

    setGuess("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameWon && guess) {
      makeGuess()
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        {!gameStarted ? (
          <div>
            <p className="mb-4">I'm thinking of a number between 1 and 100!</p>
            <EnhancedButton onClick={startNewGame} loading={loading}>
              <Play className="h-4 w-4 mr-2" />
              Start Game
            </EnhancedButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 max-w-xs mx-auto">
              <input
                type="number"
                min="1"
                max="100"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your guess"
                className="flex-1 px-3 py-2 border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={gameWon}
                aria-label="Enter your guess between 1 and 100"
              />
              <EnhancedButton onClick={makeGuess} disabled={gameWon || !guess}>
                Guess
              </EnhancedButton>
            </div>

            <div className="space-y-2">
              <Badge variant="secondary">Attempts: {attempts}</Badge>
              {feedback && (
                <div
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    gameWon
                      ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {feedback}
                </div>
              )}
            </div>

            <EnhancedButton onClick={startNewGame} variant="outline" size="sm" loading={loading}>
              <RotateCcw className="h-4 w-4 mr-2" />
              New Game
            </EnhancedButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const games = [
    {
      id: "snake",
      title: "Snake Game",
      description: "Classic snake game - eat food and grow longer!",
      icon: Zap,
      difficulty: "Medium",
      category: "Arcade",
    },
    {
      id: "memory",
      title: "Memory Match",
      description: "Flip cards and match pairs to win",
      icon: Puzzle,
      difficulty: "Easy",
      category: "Puzzle",
    },
    {
      id: "number-guess",
      title: "Number Guessing",
      description: "Guess the number I'm thinking of!",
      icon: Target,
      difficulty: "Easy",
      category: "Logic",
    },
  ]

  const renderGame = () => {
    switch (selectedGame) {
      case "snake":
        return <SnakeGame />
      case "memory":
        return <MemoryGame />
      case "number-guess":
        return <NumberGuessingGame />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mx-auto mb-4"></div>
          <div className="h-4 w-96 bg-muted animate-pulse rounded mx-auto"></div>
        </div>
        <GamesSkeleton />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimateOnScroll animation="fadeIn">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Fun Games</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a break and enjoy these interactive games that work great on both mobile and desktop
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Games List */}
        <div className="lg:col-span-1">
          <AnimateOnScroll animation="slideRight" delay={0.2}>
            <h2 className="text-2xl font-bold mb-6">Choose a Game</h2>
            <div className="space-y-4">
              {games.map((game, index) => (
                <AnimateOnScroll key={game.id} animation="slideUp" delay={0.1 + index * 0.1}>
                  <EnhancedCard
                    interactive
                    hover
                    className={`cursor-pointer transition-all ${
                      selectedGame === game.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedGame(game.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setSelectedGame(game.id)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${game.title} game`}
                  >
                    <EnhancedCardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <game.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{game.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {game.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                game.difficulty === "Easy"
                                  ? "border-green-500 text-green-700 dark:text-green-400"
                                  : game.difficulty === "Medium"
                                    ? "border-yellow-500 text-yellow-700 dark:text-yellow-400"
                                    : "border-red-500 text-red-700 dark:text-red-400"
                              }`}
                            >
                              {game.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </EnhancedCardContent>
                  </EnhancedCard>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Game Area */}
        <div className="lg:col-span-2">
          <AnimateOnScroll animation="slideLeft" delay={0.2}>
            {selectedGame ? (
              <EnhancedCard hover>
                <EnhancedCardHeader>
                  <EnhancedCardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    {games.find((g) => g.id === selectedGame)?.title}
                  </EnhancedCardTitle>
                </EnhancedCardHeader>
                <EnhancedCardContent>
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    }
                  >
                    {renderGame()}
                  </Suspense>
                </EnhancedCardContent>
              </EnhancedCard>
            ) : (
              <EnhancedCard className="h-full flex items-center justify-center">
                <EnhancedCardContent className="text-center p-8">
                  <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Game</h3>
                  <p className="text-muted-foreground">Choose a game from the left to start playing</p>
                </EnhancedCardContent>
              </EnhancedCard>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}
