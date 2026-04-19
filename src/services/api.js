const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(url, options = {}) {
  const hasBody = options.body !== undefined && options.body !== null
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const hasCustomContentType = Object.keys(options.headers || {}).some(
    (header) => header.toLowerCase() === 'content-type',
  )
  const headers = {
    Accept: 'application/json',
    ...options.headers,
  }
  if (hasBody && !isFormData && !hasCustomContentType) {
    headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await fetch(`${API_BASE}${url}`, {
      mode: 'cors',
      headers,
      ...options,
    })

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      const message = `Falha na API (${response.status}): ${text || response.statusText}`
      console.error('Erro de resposta da API:', {
        url: `${API_BASE}${url}`,
        status: response.status,
        statusText: response.statusText,
        body: text,
      })
      throw new Error(message)
    }

    return response.json()
  } catch (error) {
    const isFetchConnectionError = error instanceof TypeError && (
      error.message.includes('Failed to fetch') ||
      error.message.includes('Load failed') ||
      error.message.includes('NetworkError')
    )
    const message = isFetchConnectionError
      ? `Não foi possível conectar ao backend em ${API_BASE}. Verifique se o backend está ativo e com CORS liberado para este frontend.`
      : error.message
    console.error('Erro de conexão com a API:', {
      url: `${API_BASE}${url}`,
      error,
    })
    throw new Error(message, { cause: error })
  }
}

export const gamesApi = {
  /** Garante que o game exista no backend */
  async ensureGame(gameId) {
    try {
      return await request(`/games/`, {
        method: 'POST',
        body: JSON.stringify({ game_id: gameId }),
      })
    } catch (error) {
      // Game pode já existir, ignorar erro
      console.warn('Não foi possível garantir game no backend:', error.message)
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
