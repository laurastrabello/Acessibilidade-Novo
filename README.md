
# Filmes em Alta — Site Acessível (VS Code + GitHub)

Projeto de site estático com **capa e sinopse** de filmes em alta na Netflix e uma **barra de acessibilidade** com:
- Aumentar/Diminuir tamanho do texto (Alt+. / Alt+,)
- Trocar tema claro/escuro
- Alternar **alto contraste**
- Sublinhar links
- Reduzir animações (para usuários com sensibilidade a movimento)

> **Atenção:** Capas e sinopses aqui são **ilustrativas**. Substitua pelos filmes reais que desejar.

## 🎯 Recursos de Acessibilidade
- `skip link` para pular direto ao conteúdo.
- Botões com `role="switch"` e `aria-checked`.
- Foco visível com alto contraste.
- Suporte a alto contraste, tema claro/escuro e ajuste de fonte via CSS custom properties.
- Preferência por **semântica** (`header`, `main`, `section`, `article`) e `aria-labels`.
- Estado do usuário persistente em `localStorage`.

## 🗂 Estrutura
```
.
├── index.html
├── styles.css
├── script.js
├── images/
│   ├── atlas.png
│   ├── ultrassecreto.png
│   ├── comedia_romantica.png
│   ├── noite_sombria.png
│   ├── doc_oceano.png
│   ├── corrida_final.png
│   ├── mistério_cidade.png
│   └── mundo_animado.png
└── README.md
```

## 🚀 Como usar no VS Code
1. Abra a pasta no VS Code.
2. Clique em `index.html` e use **Go Live** (se tiver a extensão Live Server) ou abra o arquivo no navegador.
3. Edite os arquivos conforme necessário.

## 🔁 Como trocar os filmes
1. Substitua as imagens na pasta `images/` (mesmo nome para manter os caminhos) **ou** edite o JSON `window.__MOVIES__` no final do `index.html` (mude `id`, `title`, `tag`, `synopsis` e garanta que `images/{id}.png` exista).
2. (Opcional) Ajuste a **grade** em `styles.css` alterando `grid-template-columns`.

## 🌈 Paleta/Temas
- Tema padrão (escuro), tema **claro** e modo **alto contraste**.
- Links podem ser sublinhados pelo botão de acessibilidade.
- Fonte escalável com limite mínimo/máximo.

## ♿ Testes rápidos
- Tab navega por botões e cards.
- `Alt+.` aumenta o texto, `Alt+,` diminui.
- Ative/desative contraste, sublinhado e redução de movimento.
- Verifique foco visível.

## 📦 Publicação no GitHub Pages
1. Crie um repositório e faça push dos arquivos.
2. Em **Settings → Pages**, selecione a branch `main` e o diretório `root`.
3. Aguarde a publicação. O site estará acessível na URL fornecida pelo GitHub.

## 🔒 Aviso de marca
Este projeto é **didático** e não usa imagens oficiais da Netflix. Use capas que você tem direito de publicar.
