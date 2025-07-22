# Rick and Morty - Galeria de Personagens

Este projeto é uma pequena aplicação web que consome a [Rick and Morty API](https://rickandmortyapi.com/) para exibir personagens de forma interativa. O usuário pode navegar por personagens aleatórios, curtir seus favoritos e visualizá-los posteriormente.

> **Frontend feito com HTML/CSS gerado pelo ChatGPT.**
>
> **Funcionalidade JavaScript desenvolvida por Cauê Batista Chieratto.**

---

## 🔍 Funcionalidades

- 🔄 Exibe personagens de forma embaralhada (shuffle).
- 💚 Permite dar "like" em personagens.
- ⭐ Mostra os personagens curtidos (favoritos).
- 💾 Os personagens curtidos são armazenados no `localStorage`.
- 👥 Interface simples e interativa com botões de "Curtir", "Próximo" e "Favoritos".

---

## 🚀 Como funciona

### 1. Carregamento dos Personagens

- A aplicação faz uma requisição para a API pública `https://rickandmortyapi.com/api/character`.
- Os personagens recebidos são embaralhados para exibição aleatória.
- O primeiro personagem é exibido automaticamente na tela.

### 2. Botão "Próximo"

- Avança para o próximo personagem embaralhado.
- Retorna ao início da lista ao chegar no fim.

### 3. Botão "Curtir"

- Salva o personagem atual na lista de curtidos, desde que ainda não tenha sido curtido.
- Garante que o mesmo personagem não seja curtido duas vezes (verifica por `id`).
- Armazena os personagens curtidos em `localStorage`.

### 4. Botão "Favoritos"

- Alterna a exibição de uma seção que mostra os personagens curtidos.
- Exibe imagem, nome, status e espécie de cada personagem favorito.

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- [Rick and Morty API](https://rickandmortyapi.com/)

---

## ✅ Requisitos

- Nenhum build ou servidor é necessário. Basta abrir o index.html no navegador.
- Conexão com a internet (para consumir a API)

---

## 👤 Autor

Desenvolvido por **Cauê Batista Chieratto**  
HTML e CSS fornecidos via ChatGPT  
Lógica JavaScript 100% autoral
