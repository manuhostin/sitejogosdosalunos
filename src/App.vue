<script setup>
import { ref, computed, provide } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
const pesquisa = ref('')

provide('pesquisa', pesquisa)

const isGamePage = computed(() => route.path.startsWith('/GameView/'))

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const getImageUrl = (filename) => {
  return new URL(`./assets/${filename}`, import.meta.url).href
}
</script>

<template>
  <header v-if="!isGamePage">
    <div class="header-left">
      <img :src="getImageUrl('Jumper_branca.png')" alt="">
    </div>
    <div class="header-right">
      <input v-model="pesquisa" type="text" placeholder="Pesquisar..." v-if="$route.path === '/'"/>
      <button class="hamburger" @click="toggleMenu" :class="{ active: menuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
  <nav class="sidebar" :class="{ open: menuOpen }" v-if="!isGamePage">
    <ul>
      <li><router-link to="/top-projetos" @click="closeMenu">Top Projetos</router-link></li>
      <li><router-link to="/" @click="closeMenu">Home</router-link></li>
      <li><router-link to="/favoritos" @click="closeMenu">Favoritos</router-link></li>
      <li><router-link to="/recentes" @click="closeMenu">Jogados Recentemente</router-link></li>
    </ul>
  </nav>
  <router-view />
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

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.hamburger span {
  width: 30px;
  height: 3px;
  background: #22c55e;
  transition: all 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.sidebar {
  position: fixed;
  top: 70px;
  right: 20px;
  width: 250px;
  height: auto;
  background: #1e293b;
  transition: all 0.3s;
  z-index: 1000;
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
}

.sidebar.open {
  opacity: 1;
  visibility: visible;
}

.sidebar ul {
  list-style: none;
  padding: 10px;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 10px;
  display: block;
  transition: background 0.3s;
  border-radius: 4px;
}

.sidebar a:hover {
  background: #334155;
  color: #22c55e;
}
</style>

