<script setup>
import { computed, ref } from 'vue'
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
    link: "https://pacmanadrianoemanuel.vercel.app/",
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
  }


])

const categoriaSelecionada = ref('Todas')
const pesquisa = ref('')

const categorias = computed(() => {
  const opciones = projetos.value.map((p) => p.categoria)
  return ['Todas', ...Array.from(new Set(opciones))]
})

const projetosFiltrados = computed(() => {
  const termo = pesquisa.value.trim().toLowerCase()

  return projetos.value.filter((projeto) => {
    const matchesCategoria = categoriaSelecionada.value === 'Todas' || projeto.categoria === categoriaSelecionada.value
    const matchesPesquisa =
      !termo ||
      [projeto.nome, projeto.descricao, projeto.categoria]
        .some((campo) => campo.toLowerCase().includes(termo))

    return matchesCategoria && matchesPesquisa
  })
})

const irParaJogo = (id) => {
  router.push(`/GameView/${id}`)
}

const getImageUrl = (filename) => {
  return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>

<template>
  <header>
    <div class="header-left">
      <img :src="getImageUrl('Jumper_branca.png')" alt="">
    </div>
    <div class="header-right">
      <input v-model="pesquisa" type="text" placeholder="Pesquisar..." />
    </div>
  </header>
  <div class="container">
    <h1 class="titulo">🎮 Projetos dos Alunos</h1>
    <p class="subtitle">Confira os jogos desenvolvidos pelos alunos do curso de Desenvolvimento de Jogos 2D, da Jumper Joinville. Para jogar, é necessário ter um computador, pois os controles são feitos com o teclado.</p>

    <div class="filtro">
      <label for="categoria">Filtrar por categoria:</label>
      <select id="categoria" v-model="categoriaSelecionada">
        <option v-for="categoria in categorias" :key="categoria" :value="categoria">
          {{ categoria }}
        </option>
      </select>
    </div>

    <div class="grid">
      <div class="card" v-for="projeto in projetosFiltrados" :key="projeto.id" @click="irParaJogo(projeto.id)">
        <img :src="getImageUrl(projeto.imagem)" :alt="projeto.nome" />
        <h2 >{{ projeto.nome }}</h2>
        <p>{{ projeto.descricao }}</p>
        <p><strong>Categoria:</strong> {{ projeto.categoria }}</p>
        <a :href="projeto.link" target="_blank" @click.stop>Jogar 🎮</a>
      </div>
    </div>
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
header {
  background: #1e293b;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 13px;
}
.titulo {
  color: #22c55e;
  margin-bottom: 10px;
}
.header-left,
.header-right {
  display: flex;
  align-items: center;
}

img {
  height: 40px;
}

header input {
  width: 260px;
  max-width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #0f172a;
  color: white;
}

header input::placeholder {
  color: #94a3b8;
}
header input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
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

.subtitle {
  color: #94a3b8;
  margin-bottom: 30px;
}

.filtro {
  margin-bottom: 25px;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.filtro label {
  font-weight: bold;
}

.filtro select {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #22c55e;
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
</style>
