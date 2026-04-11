<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const projetos = [
  {
    id: 1,
    nome: "Jogo do Antonio Roberto",
    descricao: "Jogo de plataforma. Feito pelo Antonio Roberto",
    link: "https://jogoantoniomachado.vercel.app/",
    categoria: "Plataforma",
    Instrucoes: "Use as setas do teclado para se mover e pular. Evite os inimigos."
  },
  {
    id: 2,
    nome: "Capiblox",
    descricao: "Jogo de Plataforma. Feito pelo Murilo Rubem",
    link: "https://capiblox.vercel.app/",
    categoria: "Plataforma",
    Instrucoes: "Use as setas do teclado para se mover e pular. Colete as laranjas e evite os inimigos."
  },
  {
    id: 3,
    nome: "ProtoSpacial",
    descricao: "Jogo de nave espacial. Feito pelo Murilo Rubem",
    link: "https://proto-spacial.vercel.app/",
    categoria: "Nave Espacial",
    Instrucoes: "Use as setas do teclado para se mover até a nave. Pressione espaço para atirar e as setas para se mover para a esquerda e direita. Destrua os inimigos e sobreviva o máximo possível."
  },
  {
    id: 4,
    nome: "Airplanes & Goblins Crash!",
    descricao: "Jogo de atirar. Feito pelo Guilherme Samoel",
    link: "https://airplanes-goblins-crash.vercel.app/",
    categoria: "Atirar",
    Instrucoes: "Use as setas do teclado para se mover. Pressione espaço para atirar."
  },
  {
    id: 5,
    nome: "Dino do Google",
    descricao: "Jogo inspirado no dinossauro do google. Feito pelo Kaleo",
    link: "https://jogodinokaleo.vercel.app/",
    categoria: "Casual",
    Instrucoes: "Clique com o mouse para pular. Evite os cactos e sobreviva o máximo possível."
  },
  {
    id: 6,
    nome: "Cópia do Mario",
    descricao: "Jogo  de plataforma. Feito pelo Marcos",
    link: "https://copia-do-mario.vercel.app/",
    categoria: "Plataforma",
    Instrucoes: "Use as setas do teclado para se mover e pular. Colete os corações para crescer e evite os inimigos."
  },
  {
    id: 7,
    nome: "Mario Clone",
    descricao: "Jogo  de plataforma. Feito pelo Vinicius Lucca",
    link: "https://marioclone.vercel.app/",
    categoria: "Plataforma",
    Instrucoes: "Use as setas do teclado para se mover e pular. Colete os itens para abrir o portal e evite os inimigos."
  },
  {
    id: 8,
    nome: "Pacman",
    descricao: "Jogo inspirado no Pacman. Feito pelo Adriano Emanuel",
    link: "https://pacmanadrianoemanuel.vercel.app/",
    categoria: "Casual",
    Instrucoes: "Use as setas do teclado para se mover. Colete os pontos e evite os fantasmas."
  },
  {
    id: 9,
    nome: "Adventure World",
    descricao: "Jogo de aventura e plataforma. Feito pelo Benjamin Climaco",
    link: "https://adventure-world-pi.vercel.app/",
    categoria: "Plataforma",
    Instrucoes: "Use as setas do teclado para se mover e pular. Colete as moedas e evite cair das plataformas."
  },
  {
    id: 10,
    nome: "Tetella Stella",
    descricao: "Jogo de desviar de obstáculos. Feito pela Ellen",
    link: "https://tetella-stella.vercel.app/",
    categoria: "Casual",
    Instrucoes: "Use espaço para pular e seta para baixo para agachar. Evite os obstáculos e sobreviva o máximo possível."
  },
  {
    id: 11,
    nome: "Bichinho Virtual",
    descricao: "Jogo de cuidar. Feito pela Elisa",
    link: "https://bichinhovirtualelisa.vercel.app/",
    categoria: "Casual",
    Instrucoes: "Use o mouse para levar o gatinho até a comida e água, evite que ele fique com mais de 100 de fome ou sede."
  },
  {
    id: 12,
    nome: "Desafio Dos Pinguins",
    descricao: "Jogo de plataforma. Feito pelo Hyarley",
    link: "https://desafio-dos-pinguins.vercel.app/",
    categoria: "Plataforma",
    Instrucoes: "Use as setas do teclado para se mover e pular. Colete as moedas e evite os inimigos."
  },
  {
    id: 13,
    nome: "Jogo de Nave",
    descricao: "Jogo de nave. Feito pelo João Pedro",
    link: "https://jogo-de-nave-dun.vercel.app/",
    categoria: "Nave Espacial",
    Instrucoes: "Use as setas do teclado para se mover. Clique no mouse para atirar. Destrua os inimigos e sobreviva o máximo possível."
  },
]

const jogo = computed(() => {
  const id = parseInt(route.params.id)
  return projetos.find(p => p.id === id)
})

const voltar = () => {
  router.push('/')
}
</script>

<template>
  <div v-if="jogo" class="game-page">
    <header>
      <div class="header-left">
        <img src="@/assets/Jumper_branca.png" alt="">
      </div>
      <div class="header-right">
        <button @click="voltar" class="voltar-btn">← Voltar</button>
      </div>
    </header>
    <div class="container">
      <h1>{{ jogo.nome }}</h1>
      <p class="descricao">{{ jogo.descricao }}</p>
      <p><strong>Categoria:</strong> {{ jogo.categoria }}</p>
      <iframe :src="jogo.link" width="800" height="600" frameborder="0" allowfullscreen></iframe>
      <br>
      <p><strong>Instruções:</strong> {{ jogo.Instrucoes }}</p>
      <a :href="jogo.link" target="_blank" class="jogar-btn">Jogar em tela cheia 🎮</a>
    </div>

  </div>
  <div v-else class="not-found">
    <h1>Jogo não encontrado</h1>
    <button @click="voltar">Voltar à página inicial</button>
  </div>
    <footer>
    <p> 2026 Projetos dos Alunos. Produzido por Manu Hostim.</p>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
iframe {
    border: none; /* Remove a borda padrão */
    border-radius: 8px; /* Cantos arredondados */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Sombra suave */
    overflow: hidden; /* Esconde conteúdo extra */
}

.game-page, .not-found {
  min-height: 100vh;
  background: #0f172a;
  color: white;
}

header {
  background: #1e293b;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 13px;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

img {
  height: 40px;
}

.voltar-btn {
  padding: 10px 15px;
  background: #334155;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.voltar-btn:hover {
  background: #475569;
}

.container {
  text-align: center;
  padding: 40px;
}

.descricao {
  color: #94a3b8;
  margin-bottom: 20px;
  font-size: 18px;
}

.jogar-btn {
  display: inline-block;
  padding: 15px 30px;
  background: #22c55e;
  color: black;
  text-decoration: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
}

.jogar-btn:hover {
  background: #16a34a;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.not-found button {
  padding: 10px 20px;
  background: #334155;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
}

.not-found button:hover {
  background: #475569;
}
footer {
  text-align: center;
  padding: 20px;
  background: #1e293b;
  color: #94a3b8;
  margin-top: 40px;
}
</style>
