<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const projetos = ref([
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
    imagem: "aviao.png",
    id: 4,
    nome: "Airplanes & Goblins Crash!",
    descricao: "Jogo de atirar. Feito pelo Guilherme Samoel",
    link: "https://airplanes-goblins-crash.vercel.app/",
    categoria: "Atirar"
  },
  {
    imagem: "dino.png",
    id: 5,
    nome: "Dino do Google",
    descricao: "Jogo inspirado no dinossauro do google. Feito pelo Kaleo",
    link: "https://jogodinokaleo.vercel.app/",
    categoria: "Casual"
  },
  {
    imagem: "marco.png",
    id: 6,
    nome: "Cópia do Mario",
    descricao: "Jogo  de plataforma. Feito pelo Marcos",
    link: "https://copia-do-mario.vercel.app/",
    categoria: "Plataforma"
  },
  {
    imagem: "clone.png",
    id: 7,
    nome: "Mario Clone",
    descricao: "Jogo  de plataforma. Feito pelo Vinicius Lucca",
    link: "https://marioclone.vercel.app/",
    categoria: "Plataforma"
  },
  {
    imagem: "pac.png",
    id: 8,
    nome: "Pacman",
    descricao: "Jogo inspirado no Pacman. Feito pelo Adriano Emanuel",
    link: "https://pacmanadriano.vercel.app/",
    categoria: "Casual"
  },
  {
    imagem: "world.png",
    id: 9,
    nome: "Adventure World",
    descricao: "Jogo de aventura e plataforma. Feito pelo Benjamin Climaco",
    link: "https://adventure-world-pi.vercel.app/",
    categoria: "Plataforma"
  },
  {
    imagem: "tela.png",
    id: 10,
    nome: "Tetella Stella",
    descricao: "Jogo de desviar de obstáculos. Feito pela Ellen",
    link: "https://tetella-stella.vercel.app/",
    categoria: "Casual"
  },
  {
    imagem: "gato.png",
    id: 11,
    nome: "Bichinho Virtual",
    descricao: "Jogo de cuidar. Feito pela Elisa",
    link: "https://bichinhovirtual.vercel.app/",
    categoria: "Casual"
  },
  {
    imagem: "desafios.png",
    id: 12,
    nome: "Desafio Dos Pinguins",
    descricao: "Jogo de plataforma. Feito pelo Hyarley",
    link: "https://desafio-dos-pinguins.vercel.app/",
    categoria: "Plataforma"
  },
  {
    imagem: "nave.png",
    id: 13,
    nome: "Jogo de Nave",
    descricao: "Jogo de nave. Feito pelo João Pedro",
    link: "https://jogo-de-nave-dun.vercel.app/",
    categoria: "Nave Espacial"
  },
  {
    imagem: "Kaio.png",
    id: 14,
    nome: "Jogo do Kaio",
    descricao: "Jogo de plataforma. Feito pelo Kaio",
    link: "https://jogo-do-kaio.vercel.app/",
    categoria: "Plataforma"
  },
  {
    imagem: "navesx.png",
    id: 15,
    nome: "Naves X",
    descricao: "Jogo de nave. Feito pelo Lorenzo",
    link: "https://naves-x.vercel.app/",
    categoria: "Nave Espacial"
  },
  {
    imagem: "Monster Apocalipse.png",
    id: 16,
    nome: "Monster Apocalipse",
    descricao: "Jogo de ação. Feito pelo Theo",
    link: "https://monster-apocalipse.vercel.app/",
    categoria: "Plataforma"
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

const favoritos = ref([])

onMounted(() => {
  const stored = localStorage.getItem('favoritos')
  if (stored) {
    favoritos.value = JSON.parse(stored)
  }
})

const projetosFavoritos = computed(() => {
  return projetos.value.filter(projeto => favoritos.value.includes(projeto.id))
})

const irParaJogo = (id) => {
  router.push(`/GameView/${id}`)
}

const getImageUrl = (filename) => {
  return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>

<template>
  <div class="container">
    <h1 class="titulo">❤️ Favoritos</h1>
    <p class="subtitle">Seus projetos favoritos.</p>

    <div class="grid" v-if="projetosFavoritos.length > 0">
      <div class="card" v-for="projeto in projetosFavoritos" :key="projeto.id" @click="irParaJogo(projeto.id)">
        <img :src="getImageUrl(projeto.imagem)" :alt="projeto.nome" />
        <h2>{{ projeto.nome }}</h2>
        <p>{{ projeto.descricao }}</p>
        <p><strong>Categoria:</strong> {{ projeto.categoria }}</p>
        <a :href="projeto.link" target="_blank" @click.stop>Jogar 🎮</a>
      </div>
    </div>
    <p v-else>Você ainda não adicionou nenhum favorito. Vá para a página do jogo e clique no coração para adicionar.</p>
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
