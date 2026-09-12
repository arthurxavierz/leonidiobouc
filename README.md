# Leonídio Bouças 45999

Site institucional da campanha de Leonídio Bouças, candidato a deputado estadual por Minas Gerais (PSDB).

**Stack:** HTML + CSS + JS puros. Sem build step, sem dependências, sem backend.

## Estrutura

```
netlify.toml          configuração de deploy (headers, cache, URLs limpas, 404)
dist/                 diretório publicado
├── index.html        página inicial
├── sobre.html        história e trajetória
├── pautas.html       compromissos e frentes de atuação
├── comunicacao.html  grupos, canais oficiais e contato
├── gerador.html      gerador de fotos com a moldura da campanha
├── 404.html          página de erro
├── robots.txt        liberação para buscadores
├── sitemap.xml       mapa do site
├── styles.css        identidade visual, responsividade e animações
├── script.js         menu mobile, filtros, interações e SITE_CONFIG
├── analytics.js      Google Analytics 4 (inativo até preencher o ID)
├── gerador.css       estilos da aba do gerador (só ela carrega)
├── gerador.js        motor de composição em canvas
├── gerador-campanha.js   molduras, cores e dados do candidato
├── _headers          headers de segurança e cache (Cloudflare Pages e Netlify)
└── assets/           fotos, favicon, ícones e imagem de compartilhamento
```

## Gerador de fotos

A aba `/gerador` deixa o apoiador escolher uma foto do aparelho, ajustar dentro
da moldura da campanha e baixar a arte pronta em 1080×1080, 1080×1440 ou
1080×1920. Não existe back-end nem upload: a montagem acontece no navegador do
próprio apoiador, então nenhuma imagem sai do aparelho e nenhum dado pessoal é
armazenado.

As molduras não são arquivos de imagem. São desenhadas no canvas a partir dos
tokens de `dist/gerador-campanha.js`, o que traz três vantagens: a mesma moldura
sai nítida em qualquer formato, criar uma moldura nova é acrescentar um objeto
na lista, e levar o gerador para outra campanha é editar um arquivo só.

```js
{
  id: '01',
  nome: 'PRESENÇA',
  fundo: ['#0870d1', '#003c7f'],   // degradê do fundo
  textura: 'grade',                // grade | pontos | anel | listras | nenhuma
  janela: 'circulo',               // circulo | arco | janela
  canto: ['#a9e20b', '#ffffff'],   // faixa diagonal do rodapé
  selo:  { texto, fundo, tinta, borda },
  placa: { fundo, marcaCor, cargoFundo, cargoTinta, nome, destaque,
           numeroFundo, numeroTinta, numeroSombra, assinatura, risco }
}
```

A assinatura se dimensiona sozinha a partir do texto: nome mais longo reduz a
fonte em vez de estourar a arte. O ✓ da marca é desenhado como vetor, na mesma
inclinação usada no cabeçalho do site.

No computador, o zoom pela roda do mouse só acontece com Ctrl (ou com a pinça do
trackpad). Sem isso a rolagem da página ficaria presa quando o cursor passasse
sobre a prévia.

## Rodar localmente

Não precisa instalar nada. Abra `dist/index.html` com a extensão **Live Server** do VS Code, ou:

```bash
npx serve dist
```

O `npx serve` resolve as URLs limpas (`/pautas` serve `/pautas.html`), igual ao Netlify.

## Configuração da campanha

Tudo o que precisa ser preenchido está no topo de `dist/script.js`:

```js
const SITE_CONFIG = {
  whatsappGroupUrl: '',  // link chat.whatsapp.com do grupo oficial
  whatsappNumber: ''     // 55 + DDD + número, só dígitos. Ex.: '5534999999999'
};
```

Com `whatsappGroupUrl` vazio, os botões de grupo continuam apontando para a central
oficial (`twb.nz/leonidio`) e nada quebra. Ao preencher, todos os botões marcados com
`data-whatsapp-group` passam a levar direto para o grupo.

O Google Analytics fica desligado (nenhum cookie criado) até colar o ID em
`dist/analytics.js`.

## Cache-busting

CSS e JS são chamados com `?v=<hash>` no HTML. **Sempre que alterar `styles.css`,
`script.js` ou `analytics.js`, troque o hash nas referências** de todas as páginas,
senão o navegador serve o arquivo antigo.

## Deploy

Protótipo no **Cloudflare Pages** (grátis, publica a pasta `dist` direto do GitHub) e
produção no **Netlify** quando o site for aprovado. Passo a passo completo,
incluindo domínio e DNS: ver [DEPLOY.md](DEPLOY.md).
