"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Pause, Play, VolumeX, Trophy, Terminal, Code2 } from "lucide-react"
import { levelColors, SkillsData } from "@/data/skills"

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: "chart-1", skillCategory: "aiml" },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "chart-2",
    skillCategory: "data",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "chart-3",
    skillCategory: "mlops",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "chart-4",
    skillCategory: "backend",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "chart-5",
    skillCategory: "cloud",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "primary",
    skillCategory: "aiml",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "accent",
    skillCategory: "data",
  },
}

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const BUFFER_ROWS = 2
const TOTAL_BOARD_HEIGHT = BOARD_HEIGHT + BUFFER_ROWS
const INITIAL_DROP_TIME = 800
const SPEED_INCREASE_FACTOR = 0.8

const createEmptyBoard = () => Array.from({ length: TOTAL_BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))

const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS)
  const randKey = keys[Math.floor(Math.random() * keys.length)]
  return TETROMINOS[randKey]
}

const generateNextPieces = (count = 3) => {
  return Array.from({ length: count }, () => randomTetromino())
}

export function SkillsTetris({ skillsData }: { skillsData: SkillsData }) {
  const [board, setBoard] = useState(createEmptyBoard())
  const [currentPiece, setCurrentPiece] = useState(null)
  const [nextPieces, setNextPieces] = useState(generateNextPieces())
  const [heldPiece, setHeldPiece] = useState(null)
  const [canHold, setCanHold] = useState(true)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME)
  const [level, setLevel] = useState(1)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [completedRows, setCompletedRows] = useState([])
  const [discoveredSkills, setDiscoveredSkills] = useState(new Set())
  const [currentSkillReveal, setCurrentSkillReveal] = useState(null)
  const [skillsProgress, setSkillsProgress] = useState({})

  const audioRef = useRef(null)
  const gameStateRef = useRef({
    board,
    currentPiece,
    gameOver,
    isPaused,
  })

  useEffect(() => {
    gameStateRef.current = { board, currentPiece, gameOver, isPaused }
  }, [board, currentPiece, gameOver, isPaused])

  const checkCollision = useCallback(
    (x, y, shape, currentBoard = board) => {
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col] !== 0) {
            const newX = x + col
            const newY = y + row

            if (newX < 0 || newX >= BOARD_WIDTH) {
              return true
            }

            if (newY >= TOTAL_BOARD_HEIGHT) {
              return true
            }

            if (newY >= 0 && currentBoard[newY][newX] !== 0) {
              return true
            }
          }
        }
      }
      return false
    },
    [board],
  )

  const isValidMove = useCallback(
    (x, y, shape, currentBoard = board) => {
      return !checkCollision(x, y, shape, currentBoard)
    },
    [checkCollision],
  )

  const checkGameOver = useCallback((currentBoard) => {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (currentBoard[BUFFER_ROWS][x] !== 0) {
        return true
      }
    }
    return false
  }, [])

  const revealSkill = useCallback(
    (skillCategory) => {
      const categorySkills = skillsData[skillCategory]?.skills || []
      const unrevealedSkills = categorySkills.filter((skill) => !discoveredSkills.has(skill.name))

      if (unrevealedSkills.length > 0) {
        const randomSkill = unrevealedSkills[Math.floor(Math.random() * unrevealedSkills.length)]
        setDiscoveredSkills((prev) => new Set([...prev, randomSkill.name]))
        setCurrentSkillReveal({
          skill: randomSkill,
          category: categorySkills.category,
        })

        // Update progress
        setSkillsProgress((prev) => ({
          ...prev,
          [skillCategory]: (prev[skillCategory] || 0) + 1,
        }))

        setTimeout(() => setCurrentSkillReveal(null), 3000)
      }
    },
    [skillsData, discoveredSkills],
  )

  const holdPiece = useCallback(() => {
    if (!canHold || !currentPiece) return

    if (heldPiece) {
      const newPiece = {
        x: Math.floor(BOARD_WIDTH / 2) - 1,
        y: 0,
        tetromino: heldPiece,
      }

      if (!isValidMove(newPiece.x, newPiece.y, newPiece.tetromino.shape)) {
        setGameOver(true)
        return
      }

      setHeldPiece(currentPiece.tetromino)
      setCurrentPiece(newPiece)
    } else {
      setHeldPiece(currentPiece.tetromino)
      spawnNewPiece()
    }
    setCanHold(false)
  }, [currentPiece, heldPiece, canHold, isValidMove])

  const moveLeft = useCallback(() => {
    if (currentPiece && !isPaused && isValidMove(currentPiece.x - 1, currentPiece.y, currentPiece.tetromino.shape)) {
      setCurrentPiece((prev) => ({ ...prev, x: prev.x - 1 }))
    }
  }, [currentPiece, isPaused, isValidMove])

  const moveRight = useCallback(() => {
    if (currentPiece && !isPaused && isValidMove(currentPiece.x + 1, currentPiece.y, currentPiece.tetromino.shape)) {
      setCurrentPiece((prev) => ({ ...prev, x: prev.x + 1 }))
    }
  }, [currentPiece, isPaused, isValidMove])

  const moveDown = useCallback(() => {
    if (!currentPiece || isPaused) return
    if (isValidMove(currentPiece.x, currentPiece.y + 1, currentPiece.tetromino.shape)) {
      setCurrentPiece((prev) => ({ ...prev, y: prev.y + 1 }))
    } else {
      placePiece()
    }
  }, [currentPiece, isPaused, isValidMove])

  const rotate = useCallback(() => {
    if (!currentPiece || isPaused) return
    const rotated = currentPiece.tetromino.shape[0].map((_, i) =>
      currentPiece.tetromino.shape.map((row) => row[i]).reverse(),
    )
    const newX = currentPiece.x
    const newY = currentPiece.y

    const wallKickOffsets = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, -1],
      [-1, -1],
      [1, -1],
    ]

    for (const [offsetX, offsetY] of wallKickOffsets) {
      const testX = newX + offsetX
      const testY = newY + offsetY

      if (isValidMove(testX, testY, rotated)) {
        setCurrentPiece((prev) => ({
          ...prev,
          x: testX,
          y: testY,
          tetromino: { ...prev.tetromino, shape: rotated },
        }))
        return
      }
    }
  }, [currentPiece, isPaused, isValidMove])

  const hardDrop = useCallback(() => {
    if (!currentPiece || isPaused) return

    let dropY = currentPiece.y
    while (isValidMove(currentPiece.x, dropY + 1, currentPiece.tetromino.shape)) {
      dropY++
    }

    if (isValidMove(currentPiece.x, dropY, currentPiece.tetromino.shape)) {
      const droppedPiece = { ...currentPiece, y: dropY }
      placePieceAtPosition(droppedPiece)
    }
  }, [currentPiece, isPaused, isValidMove])

  const placePieceAtPosition = useCallback(
    (piece) => {
      const newBoard = board.map((row) => [...row])
      let validPlacement = true

      piece.tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const boardY = y + piece.y
            const boardX = x + piece.x

            if (boardY >= 0 && boardY < TOTAL_BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              if (newBoard[boardY][boardX] === 0) {
                newBoard[boardY][boardX] = piece.tetromino.color
              } else {
                validPlacement = false
              }
            } else {
              validPlacement = false
            }
          }
        })
      })

      if (validPlacement) {
        setBoard(newBoard)
        setCurrentPiece(null)

        // Reveal skill when piece is placed
        if (piece.tetromino.skillCategory) {
          revealSkill(piece.tetromino.skillCategory)
        }

        if (checkGameOver(newBoard)) {
          setGameOver(true)
          return
        }

        clearLines(newBoard)
        setCanHold(true)
        spawnNewPiece()
      } else {
        setGameOver(true)
      }
    },
    [board, checkGameOver, revealSkill],
  )

  const placePiece = useCallback(() => {
    if (!currentPiece) return
    placePieceAtPosition(currentPiece)
  }, [currentPiece, placePieceAtPosition])

  const clearLines = useCallback(
    (newBoard) => {
      const linesCleared = []
      const updatedBoard = []

      for (let i = 0; i < TOTAL_BOARD_HEIGHT; i++) {
        const row = newBoard[i]
        if (i >= BUFFER_ROWS && row.every((cell) => cell !== 0)) {
          linesCleared.push(i)
        } else {
          updatedBoard.push([...row])
        }
      }

      if (linesCleared.length > 0) {
        setCompletedRows(linesCleared.map((row) => row - BUFFER_ROWS))
        setTimeout(() => {
          while (updatedBoard.length < TOTAL_BOARD_HEIGHT) {
            updatedBoard.unshift(Array(BOARD_WIDTH).fill(0))
          }
          setBoard(updatedBoard)
          setCompletedRows([])

          const newScore = score + linesCleared.length * 100
          const newLines = lines + linesCleared.length
          setScore(newScore)
          setLines(newLines)

          if (Math.floor(newLines / 10) > level - 1) {
            setLevel((prev) => prev + 1)
            setDropTime((prev) => Math.max(prev * SPEED_INCREASE_FACTOR, 50))
          }
        }, 500)
      }
    },
    [score, lines, level],
  )

  const spawnNewPiece = useCallback(() => {
    setNextPieces((prevNextPieces) => {
      const newPiece = {
        x: Math.floor(BOARD_WIDTH / 2) - 1,
        y: 0,
        tetromino: prevNextPieces[0],
      }

      const updatedNextPieces = [...prevNextPieces.slice(1), randomTetromino()]

      if (checkCollision(newPiece.x, newPiece.y, newPiece.tetromino.shape)) {
        setGameOver(true)
      } else {
        setCurrentPiece(newPiece)
      }

      return updatedNextPieces
    })
  }, [checkCollision])

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      spawnNewPiece()
    }
  }, [currentPiece, gameOver, spawnNewPiece])

  useEffect(() => {
    let interval = null

    if (!gameOver && !isPaused) {
      interval = setInterval(() => {
        const {
          currentPiece: piece,
          board: currentBoard,
          gameOver: isGameOver,
          isPaused: paused,
        } = gameStateRef.current

        if (isGameOver || paused || !piece) return

        const canMoveDown = !checkCollision(piece.x, piece.y + 1, piece.tetromino.shape, currentBoard)

        if (canMoveDown) {
          setCurrentPiece((prev) => (prev ? { ...prev, y: prev.y + 1 } : null))
        } else {
          placePieceAtPosition(piece)
        }
      }, dropTime)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [gameOver, isPaused, dropTime, checkCollision, placePieceAtPosition])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return
      switch (e.key) {
        case "ArrowLeft":
          moveLeft()
          break
        case "ArrowRight":
          moveRight()
          break
        case "ArrowDown":
          moveDown()
          break
        case "ArrowUp":
          rotate()
          break
        case " ":
          e.preventDefault()
          hardDrop()
          break
        case "p":
        case "P":
          togglePause()
          break
        case "h":
        case "H":
          holdPiece()
          break
        default:
          break
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [moveLeft, moveRight, moveDown, rotate, gameOver, holdPiece])

  const resetGame = () => {
    setBoard(createEmptyBoard())
    setCurrentPiece(null)
    setNextPieces(generateNextPieces())
    setHeldPiece(null)
    setCanHold(true)
    setScore(0)
    setLines(0)
    setGameOver(false)
    setIsPaused(false)
    setDropTime(INITIAL_DROP_TIME)
    setLevel(1)
    setCompletedRows([])
    setDiscoveredSkills(new Set())
    setCurrentSkillReveal(null)
    setSkillsProgress({})
  }

  const renderCell = (x, y) => {
    const actualY = y + BUFFER_ROWS

    if (
      currentPiece &&
      currentPiece.tetromino.shape[actualY - currentPiece.y] &&
      currentPiece.tetromino.shape[actualY - currentPiece.y][x - currentPiece.x]
    ) {
      return currentPiece.tetromino.color
    }
    return board[actualY][x]
  }

  const renderPiece = (tetromino, size = 20) => {
    if (!tetromino) return null
    return (
      <div
        className="grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${tetromino.shape[0].length}, 1fr)`,
        }}
      >
        {tetromino.shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`${cell ? `bg-${tetromino.color}` : "bg-transparent"}`}
              style={{ width: size, height: size }}
            />
          )),
        )}
      </div>
    )
  }

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying)
  }

  const getTotalSkills = () => {
    return Object.values(skillsData).reduce((total, category) => total + category.skills.length, 0)
  }

  const getDiscoveredSkillsArray = () => {
    const discovered = []
    Object.values(skillsData).forEach((category) => {
      category.skills.forEach((skill) => {
        if (discoveredSkills.has(skill.name)) {
          discovered.push({ ...skill, category: category.category })
        }
      })
    })
    return discovered
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <AnimatePresence>
        {currentSkillReveal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-card border-primary shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Terminal className="w-6 h-6 mr-2 text-primary" />
                  <h3 className="text-xl font-bold font-mono text-foreground">Skill Discovered!</h3>
                  <Code2 className="w-6 h-6 ml-2 text-primary" />
                </div>
                <p className="text-lg font-semibold font-mono text-foreground">{currentSkillReveal.skill.name}</p>
                <p className="text-sm text-muted-foreground font-mono">{currentSkillReveal.category}</p>
                <Badge className={`mt-2 ${levelColors[currentSkillReveal.skill.level]} text-white border-0 font-mono`}>
                  {currentSkillReveal.skill.level}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6 text-center">

        <p className="text-lg font-mono text-muted-foreground">
          <span className="text-primary">&gt;</span> Place blocks to discover AI engineering skills
        </p>
        <div className="mt-2 text-sm font-mono text-muted-foreground">
          Progress: {discoveredSkills.size}/{getTotalSkills()} skills
          discovered
        </div>
      </div>

      <div className="flex gap-8 items-start">
        <div className="flex flex-col gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-center font-mono">Hold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-20 h-16 rounded flex items-center justify-center bg-muted">
                {renderPiece(heldPiece, 15)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold font-mono text-primary">Score</h4>
                  <div className="p-2 rounded text-center bg-muted font-mono text-foreground">{score}</div>
                </div>
                <div>
                  <h4 className="font-bold font-mono text-primary">Level</h4>
                  <div className="p-2 rounded text-center bg-muted font-mono text-foreground">{level}</div>
                </div>
                <div>
                  <h4 className="font-bold font-mono text-primary">Lines</h4>
                  <div className="p-2 rounded text-center bg-muted font-mono text-foreground">{lines}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-center text-sm font-mono">Skills Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                {Object.entries(skillsData).map(([key, category]) => (
                  <div key={key} className="text-xs">
                    <div className="flex justify-between text-muted-foreground mb-1 font-mono">
                      <span>{category.category}</span>
                      <span>
                        {skillsProgress[key] || 0}/{category.skills.length}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${((skillsProgress[key] || 0) / category.skills.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center">
          <Card className="bg-card border-border p-4">
            <div
              className="grid bg-muted border-2 border-border"
              style={{
                gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
                width: `${BOARD_WIDTH * 25}px`,
                height: `${BOARD_HEIGHT * 25}px`,
              }}
            >
              {Array.from({ length: BOARD_HEIGHT }, (_, y) =>
                Array.from({ length: BOARD_WIDTH }, (_, x) => (
                  <AnimatePresence key={`${y}-${x}`}>
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: completedRows.includes(y) ? 0 : 1,
                        scale: completedRows.includes(y) ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-6 h-6 border border-border ${
                        renderCell(x, y) ? `bg-${renderCell(x, y)}` : "bg-background"
                      }`}
                    />
                  </AnimatePresence>
                )),
              )}
            </div>
          </Card>

          <div className="h-12 flex items-center justify-center mt-4">
            {gameOver && <div className="text-2xl font-bold font-mono text-destructive">Game Over!</div>}
            {isPaused && !gameOver && <div className="text-2xl font-bold font-mono text-primary">Paused</div>}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-center font-mono">Next</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nextPieces.slice(0, 3).map((piece, index) => (
                  <div key={index} className="w-20 h-16 rounded flex items-center justify-center bg-muted">
                    {renderPiece(piece, 15)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border max-w-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground text-center text-sm flex items-center justify-center font-mono">
                <Trophy className="w-4 h-4 mr-2 text-primary" />
                Discovered Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {getDiscoveredSkillsArray().map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between text-xs bg-muted p-2 rounded border border-border"
                  >
                    <div>
                      <div className="text-foreground font-medium font-mono">{skill.name}</div>
                      <div className="text-muted-foreground text-xs font-mono">{skill.category}</div>
                    </div>
                    <Badge className={`${levelColors[skill.level]} text-white border-0 text-xs font-mono`}>
                      {skill.level}
                    </Badge>
                  </motion.div>
                ))}
                {discoveredSkills.size === 0 && (
                  <div className="text-muted-foreground text-center text-xs py-4 font-mono">
                    <span className="text-primary">$</span> Start playing to discover skills!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 right-4 flex justify-between items-end">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-3 text-center text-foreground font-mono">Controls</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="bg-muted px-2 py-1 rounded text-xs font-mono min-w-[60px] text-center text-foreground">
                  ←→↑↓
                </div>
                <span className="font-mono">Move/Rotate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-muted px-2 py-1 rounded text-xs font-mono min-w-[60px] text-center text-foreground">
                  SPACE
                </div>
                <span className="font-mono">Hard drop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-muted px-2 py-1 rounded text-xs font-mono min-w-[60px] text-center text-foreground">
                  H
                </div>
                <span className="font-mono">Hold piece</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-muted px-2 py-1 rounded text-xs font-mono min-w-[60px] text-center text-foreground">
                  P
                </div>
                <span className="font-mono">Pause</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button onClick={togglePause} size="sm" className="bg-primary hover:bg-primary/90 font-mono">
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button onClick={toggleMusic} size="sm" className="bg-primary hover:bg-primary/90 font-mono">
            {isMusicPlaying ? <Music className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button onClick={resetGame} size="sm" className="bg-primary hover:bg-primary/90 font-mono">
            {gameOver ? "Play Again" : "Reset"}
          </Button>
        </div>
      </div>
    </div>
  )
}
