import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const DB_PATH = fileURLToPath(new URL('./mock-db.json', import.meta.url))

const loadDb = async () => {
  try {
    const content = await readFile(DB_PATH, 'utf-8')
    return JSON.parse(content)
  } catch {
    return { games: [] }
  }
}

const saveDb = async (db) => {
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

const now = () => new Date().toISOString()

const findGame = (db, gameId) => db.games.find((game) => game.game_id === gameId)

const createGame = (db, gameId) => {
  let game = findGame(db, gameId)
  if (!game) {
    game = {
      game_id: gameId,
      created_at: now(),
      updated_at: now(),
      likes: [],
      comments: [],
      views: [],
    }
    db.games.push(game)
  }
  return game
}

const parseJsonBody = async (req) => {
  let body = ''
  for await (const chunk of req) {
    body += chunk
  }
  if (!body) return {}
  try {
    return JSON.parse(body)
  } catch {
    return {}
  }
}

const sendJson = (res, status, data) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

const sendNotFound = (res, path) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ detail: `Path not found: ${path}` }))
}

export function mockApiPlugin() {
  return {
    name: 'vite:mock-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api')) {
          return next()
        }

        const url = new URL(req.url, 'http://localhost')
        const segments = url.pathname.split('/').filter(Boolean)
        const method = req.method.toUpperCase()
        const db = await loadDb()

        // POST /api/games/ — create/ensure game
        if (segments.length === 2 && segments[0] === 'api' && segments[1] === 'games' && method === 'POST') {
          const body = await parseJsonBody(req)
          const gameId = Number(body.game_id)
          if (!gameId) {
            return sendJson(res, 400, { error: 'game_id is required' })
          }
          const game = createGame(db, gameId)
          game.updated_at = now()
          await saveDb(db)
          return sendJson(res, 201, game)
        }

        if (segments[0] !== 'api' || segments[1] !== 'games') {
          return sendNotFound(res, req.url)
        }

        const gameId = Number(segments[2])
        if (!gameId || Number.isNaN(gameId)) {
          return sendJson(res, 400, { error: 'Invalid game id' })
        }

        const game = findGame(db, gameId)
        const resource = segments[3]

        // GET /api/games/:id/
        if (segments.length === 3 && method === 'GET') {
          if (!game) {
            return sendJson(res, 404, { error: 'Game not found' })
          }
          return sendJson(res, 200, {
            game_id: game.game_id,
            created_at: game.created_at,
            updated_at: game.updated_at,
            statistics: {
              likes: game.likes.length,
              comments: game.comments.length,
              views: game.views.length,
            },
          })
        }

        // POST /api/games/:id/ — ensure game exists
        if (segments.length === 3 && method === 'POST') {
          const targetGame = createGame(db, gameId)
          targetGame.updated_at = now()
          await saveDb(db)
          return sendJson(res, 201, targetGame)
        }

        if (!game) {
          return sendJson(res, 404, { error: 'Game not found' })
        }

        // POST /api/games/:id/views/
        if (resource === 'views' && method === 'POST') {
          const view = {
            id: game.views.length + 1,
            user_id: null,
            ip_address: '127.0.0.1',
            created_at: now(),
          }
          game.views.push(view)
          game.updated_at = now()
          await saveDb(db)
          return sendJson(res, 201, view)
        }

        // POST /api/games/:id/like/
        if (resource === 'like' && method === 'POST') {
          const like = {
            id: game.likes.length + 1,
            user_id: null,
            created_at: now(),
          }
          game.likes.push(like)
          game.updated_at = now()
          await saveDb(db)
          return sendJson(res, 201, like)
        }

        // DELETE /api/games/:id/unlike/
        if (resource === 'unlike' && method === 'DELETE') {
          if (game.likes.length > 0) {
            game.likes.pop()
            game.updated_at = now()
            await saveDb(db)
          }
          return sendJson(res, 200, { message: 'Like removed' })
        }

        // GET/POST /api/games/:id/comments/
        if (resource === 'comments') {
          if (method === 'GET') {
            return sendJson(res, 200, {
              game_id: game.game_id,
              total_comments: game.comments.length,
              comments: game.comments,
            })
          }
          if (method === 'POST') {
            const body = await parseJsonBody(req)
            const text = body.text || ''
            if (!text.trim()) {
              return sendJson(res, 400, { error: 'text is required' })
            }
            const comment = {
              id: game.comments.length + 1,
              user_id: null,
              text: text.trim(),
              created_at: now(),
              updated_at: now(),
            }
            game.comments.push(comment)
            game.updated_at = now()
            await saveDb(db)
            return sendJson(res, 201, comment)
          }
        }

        return sendNotFound(res, req.url)
      })
    },
  }
}
