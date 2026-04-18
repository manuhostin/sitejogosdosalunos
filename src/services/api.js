const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`API ${response.status}: ${text}`)
  }
  return response.json()
}

export const gamesApi = {
  /** Garante que o game exista no backend */
  async ensureGame(gameId) {
    try {
      return await request(`/games/`, {
        method: 'POST',
        body: JSON.stringify({ game_id: gameId }),
      })
    } catch {
      // Game pode já existir, ignorar erro
    }
  },

  /** Busca dados de um jogo (estatísticas) */
  async getGame(gameId) {
    return request(`/games/${gameId}/`)
  },

  /** Registra uma visualização */
  async addView(gameId) {
    return request(`/games/${gameId}/views/`, {
      method: 'POST',
      body: JSON.stringify({}),
    })
  },

  /** Adiciona um like */
  async addLike(gameId) {
    return request(`/games/${gameId}/like/`, {
      method: 'POST',
      body: JSON.stringify({}),
    })
  },

  /** Remove um like */
  async removeLike(gameId) {
    return request(`/games/${gameId}/unlike/`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    })
  },

  /** Busca comentários de um jogo */
  async getComments(gameId) {
    return request(`/games/${gameId}/comments/`)
  },

  /** Adiciona um comentário */
  async addComment(gameId, text) {
    return request(`/games/${gameId}/comments/`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
  },
}
