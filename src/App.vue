<script setup>
import { ref } from 'vue'

const projetos = ref([
  {
    nome: "Jogo do Antonio Roberto",
    descricao: "Jogo de plataforma. Feito pelo Antonio Roberto",
    link: "https://jogoantoniomachado.vercel.app/"
  },
  {
    nome: "Capiblox",
    descricao: "Jogo de Plataforma. Feito pelo Murilo Rubem",
    link: "https://capiblox.vercel.app/"
  },
  {
    nome: "ProtoSpacial",
    descricao: "Jogo de nave espacial. Feito pelo Murilo Rubem",
    link: "https://proto-spacial.vercel.app/"
  },

  {
    nome: "Airplanes & Goblins Crash!",
    descricao: "Jogo de atirar. Feito pelo Guilherme Samoel",
    link: "https://airplanes-goblins-crash.vercel.app/"
  },
   {
    nome: "Dino do Google",
    descricao: "Jogo inspirado no dinossauro do google. Feito pelo Kaleo",
    link: "https://jogodinokaleo.vercel.app/"
  },
     {
    nome: "Cópia do Mario",
    descricao: "Jogo  de plataforma. Feito pelo Marcos",
    link: "https://copia-do-mario.vercel.app/"
  },
  {
    nome: "Mario Clone",
    descricao: "Jogo  de plataforma. Feito pelo Vinicius Lucca",
    link: "https://marioclone.vercel.app/"
  },
   {
    nome: "Pacman",
    descricao: "Jogo inspirado no Pacman. Feito pelo Adriano Emanuel",
    link: "https://pacmanadrianoemanuel.vercel.app/"
  },
    {
    nome: "Adventure World",
    descricao: "Jogo de aventura e plataforma. Feito pelo Benjamin Climaco",
    link: "https://adventure-world-pi.vercel.app/"
  },
   {
    nome: "Tetella Stella",
    descricao: "Jogo de desviar de obstáculos. Feito pela Ellen",
    link: "https://tetella-stella.vercel.app/"
  },
 {
    nome: "Bichinho Virtual",
    descricao: "Jogo de cuidar. Feito pela Elisa",
    link: "https://bichinhovirtualelisa.vercel.app/"
  },
   {
    nome: "Desafio Dos Pinguins",
    descricao: "Jogo de plataforma. Feito pelo Hyarley",
    link: "https://desafio-dos-pinguins.vercel.app/"
  },
    {
    nome: "Jogo de Nave",
    descricao: "Jogo de nave. Feito pelo João Pedro",
    link: "https://jogo-de-nave-dun.vercel.app/"
  },

])
</script>

<template>
  <div class="container">
    <h1>🎮 Projetos dos Alunos</h1>
    <p class="subtitle">Confira os jogos desenvolvidos pelos alunos do curso de Desenvolvimento de Jogos 2D, da Jumper Joinville. Para jogar, é necessário ter um computador, pois os controles são feitos com o teclado.</p>

    <div class="grid">
      <div class="card" v-for="(projeto, index) in projetos" :key="index">
        <h2>{{ projeto.nome }}</h2>
        <p>{{ projeto.descricao }}</p>
        <a :href="projeto.link" target="_blank">Jogar 🎮</a>
      </div>
    </div>
  </div>
  <footer>
    <p> 2026 Projetos dos Alunos. Produzido por Manu Hostim.</p>
  </footer>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: white;
}

.container {
  text-align: center;
  padding: 40px;
}

.subtitle {
  color: #94a3b8;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
footer {
  text-align: center;
  padding: 20px;
  background: #1e293b;
  color: #94a3b8;
  margin-top: 40px;
}
.card {
  background: #1e293b;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s;
}

.card:hover {
  transform: scale(1.05);
  background: #334155;
}

.card h2 {
  margin-bottom: 10px;
}

.card p {
  font-size: 14px;
  margin-bottom: 15px;
}

.card a {
  display: inline-block;
  padding: 10px 15px;
  background: #22c55e;
  color: black;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
}

.card a:hover {
  background: #16a34a;
}
</style>
