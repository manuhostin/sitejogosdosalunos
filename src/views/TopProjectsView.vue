<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const topProjetos = ref([
  {
    imagem: "antonio.png",
    id: 1,
    nome: "Jogo do Antonio Roberto",
    descricao: "Jogo de plataforma. Feito pelo Antonio Roberto",
    link: "https://jogoantoniomachado.vercel.app/",
    categoria: "Plataforma"
  },
  {
    imagem: "cap.png",
    id: 2,
    nome: "Capiblox",
    descricao: "Jogo de Plataforma. Feito pelo Murilo Rubem",
    link: "https://capiblox.vercel.app/",
    categoria: "Plataforma"
  },
  {
    imagem: "proto.png",
    id: 3,
    nome: "ProtoSpacial",
    descricao: "Jogo de nave espacial. Feito pelo Murilo Rubem",
    link: "https://proto-spacial.vercel.app/",
    categoria: "Nave Espacial"
  },
  {
    imagem: "lucas.png",
    id: 17,
    nome: "Sua Carreira no Futebol em Labirinto",
    descricao: "Jogo de plataforma. Feito pelo Lucas",
    link: "https://sua-carreira-no-futebol-em-labirint.vercel.app/",
    categoria: "Plataforma"
  }
])

const irParaJogo = (id) => {
  router.push(`/GameView/${id}`)
}

const getImageUrl = (filename) => {
  return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>

<template>
  <div class="container">
    <h1 class="titulo">🏆 Top Projetos</h1>
    <p class="subtitle">Os projetos mais destacados dos alunos.</p>

    <div class="grid" v-if="topProjetos.length > 0">
      <div class="card" v-for="projeto in topProjetos" :key="projeto.id" @click="irParaJogo(projeto.id)">
        <img :src="getImageUrl(projeto.imagem)" :alt="projeto.nome" />
        <h2>{{ projeto.nome }}</h2>
        <p>{{ projeto.descricao }}</p>
        <p><strong>Categoria:</strong> {{ projeto.categoria }}</p>
        <a :href="projeto.link" target="_blank" @click.stop>Jogar 🎮</a>
      </div>
    </div>
    <p v-else>Em breve, os top projetos serão selecionados.</p>
  </div>
  <footer>
    <p> 2026 Projetos dos Alunos. Produzido por Manu Hostim.</p>
  </footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

body {
  margin: 0;
  background: #0f172a;
  color: white;
}

.container {
  text-align: center;
  padding: 40px;
}

.titulo {
  color: #22c55e;
  margin-bottom: 10px;
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

.card {
  background: #1e293b;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
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

footer {
  text-align: center;
  padding: 20px;
  background: #1e293b;
  color: #94a3b8;
  margin-top: 40px;
}
</style>
