/* ==================================================================
   GERADOR DE FOTOS - CONFIGURACAO DA CAMPANHA
   ------------------------------------------------------------------
   Unico arquivo que muda de um candidato para outro. O motor
   (gerador.js) desenha as artes a partir daqui: nao existe imagem de
   moldura para produzir, tudo e gerado no navegador em alta resolucao.
================================================================== */

window.GERADOR_CAMPANHA = {

  /* --- Identificacao ------------------------------------------- */
  candidato: {
    nome: 'LEONÍDIO',
    sobrenome: 'BOUÇAS',
    numero: '45999',
    cargo: 'CANDIDATO A DEPUTADO ESTADUAL',
    regiao: 'MINAS GERAIS',
    assinatura: 'MINAS VAI FAZER MAIS',
    instagram: 'leonidioboucas'
  },

  /* Prefixo do arquivo baixado */
  arquivo: 'leonidio-boucas-45999',

  /* --- Paleta --------------------------------------------------- */
  cores: {
    azul: '#0755a3',
    azulProfundo: '#003c7f',
    azulTinta: '#032b5a',
    lima: '#a9e20b',
    limaClaro: '#c2f02a',
    tinta: '#071524',
    branco: '#ffffff'
  },

  /* --- Fontes usadas no canvas ---------------------------------- */
  fontes: {
    display: '"Anton", Impact, sans-serif',
    displayEstilo: '400',
    corpo: 'Manrope, Arial, sans-serif'
  },

  /* --- Marca: o mesmo visto do cabecalho do site ---------------- */
  marca: {
    largura: 100,
    altura: 100,
    rotacao: -0.14,
    caminhos: [
      { cor: '#a9e20b', d: 'M4 54 L22 36 L40 54 L80 14 L98 32 L40 90 Z' }
    ]
  },

  /* --- Formatos de saida ---------------------------------------- */
  formatos: [
    { id: 'quadrado', nome: 'QUADRADO', medida: '1080 × 1080', largura: 1080, altura: 1080 },
    { id: 'feed',     nome: 'FEED',     medida: '1080 × 1440', largura: 1080, altura: 1440 },
    { id: 'story',    nome: 'STORY',    medida: '1080 × 1920', largura: 1080, altura: 1920 }
  ],

  /* --- Molduras -------------------------------------------------
     fundo      : duas cores do degrade
     brilho     : halo superior (null desliga)
     textura    : 'grade' | 'pontos' | 'anel' | 'listras' | 'nenhuma'
     janela     : 'circulo' | 'arco' | 'janela'
     canto      : faixa diagonal no rodape da arte
     selo       : etiqueta adesiva sobre a foto
     placa      : assinatura visual da campanha
  --------------------------------------------------------------- */
  molduras: [
    {
      id: '01',
      nome: 'PRESENÇA',
      fundo: ['#0870d1', '#003c7f'],
      brilho: 'rgba(169,226,11,.24)',
      textura: 'grade',
      janela: 'circulo',
      aro: 'rgba(255,255,255,.3)',
      tintaExtra: '#ffffff',
      canto: ['#a9e20b', '#ffffff'],
      selo: { texto: 'EU VOTO 45999', fundo: '#a9e20b', tinta: '#032b5a', borda: '#ffffff' },
      placa: {
        fundo: '#ffffff',
        cargoFundo: '#0755a3', cargoTinta: '#ffffff',
        nome: '#032b5a', destaque: '#0755a3',
        numeroFundo: '#a9e20b', numeroTinta: '#032b5a', numeroSombra: '#003c7f',
        assinatura: '#0755a3', risco: '#a9e20b'
      }
    },
    {
      id: '02',
      nome: 'MINAS',
      fundo: ['#c2f02a', '#8fc406'],
      brilho: 'rgba(255,255,255,.44)',
      textura: 'anel',
      janela: 'circulo',
      aro: 'rgba(3,43,90,.24)',
      tintaExtra: '#032b5a',
      canto: ['#0755a3', '#ffffff'],
      selo: { texto: 'MINAS VAI FAZER MAIS', fundo: '#032b5a', tinta: '#a9e20b', borda: '#ffffff' },
      placa: {
        fundo: '#032b5a',
        cargoFundo: '#a9e20b', cargoTinta: '#032b5a',
        nome: '#ffffff', destaque: '#a9e20b',
        numeroFundo: '#a9e20b', numeroTinta: '#032b5a', numeroSombra: '#0755a3',
        assinatura: '#a9e20b', risco: '#0755a3'
      }
    },
    {
      id: '03',
      nome: 'TRABALHO',
      fundo: ['#0755a3', '#032b5a'],
      brilho: 'rgba(255,255,255,.2)',
      textura: 'listras',
      janela: 'arco',
      aro: 'rgba(169,226,11,.55)',
      tintaExtra: '#ffffff',
      canto: ['#a9e20b', '#ffffff'],
      selo: { texto: 'OUVIR. ESTAR. FAZER.', fundo: '#ffffff', tinta: '#0755a3', borda: '#032b5a' },
      placa: {
        fundo: '#a9e20b',
        marcaCor: '#032b5a',
        cargoFundo: '#032b5a', cargoTinta: '#a9e20b',
        nome: '#032b5a', destaque: '#0755a3',
        numeroFundo: '#032b5a', numeroTinta: '#a9e20b', numeroSombra: '#ffffff',
        assinatura: '#032b5a', risco: '#ffffff'
      }
    }
  ]
};
