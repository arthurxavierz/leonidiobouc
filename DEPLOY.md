# Deploy — Leonídio Bouças 45999

Padrão Achilles Media: **GitHub → Netlify → Cloudflare DNS**.
Sem Supabase: o site é totalmente estático e não grava nada.

Domínio provisório: `leonidioboucas.achillesmedia.com.br`
Domínio definitivo (quando validado): `leonidioboucas.com.br`

---

## 1. GitHub

```bash
git remote add origin https://github.com/arthurxavierz/leonidiobouc.git
git push -u origin main
```

O `git init` e o commit inicial já estão feitos.

---

## 2. Netlify

1. **Add new site → Import an existing project → GitHub** → selecione o repositório.
2. As configurações de build vêm do `netlify.toml` — não altere no painel:
   - Build command: *(vazio)*
   - Publish directory: `dist`
3. Deploy. O site sobe em `<nome-aleatorio>.netlify.app`.
4. **Site settings → General → Site name:** renomeie para `leonidio-boucas-45999`
   (fica `leonidio-boucas-45999.netlify.app` — use esse nome no CNAME abaixo).

O `netlify.toml` já entrega:
- headers de segurança (HSTS, nosniff, frame-options, permissions-policy);
- cache imutável em `/assets/*` e revalidação em HTML, CSS e JS (deploy novo aparece na hora);
- URLs limpas (`/pautas` serve `/pautas.html`);
- `404.html` como página de erro.

---

## 3. Cloudflare (DNS)

Na zona `achillesmedia.com.br`:

| Tipo  | Nome             | Conteúdo                                | Proxy                 |
|-------|------------------|-----------------------------------------|-----------------------|
| CNAME | `leonidioboucas` | `leonidio-boucas-45999.netlify.app`     | **DNS only** ☁️ cinza |

> **Importante:** deixe o proxy **desligado** (nuvem cinza). Com o proxy laranja, o
> Netlify não consegue emitir/renovar o certificado Let's Encrypt e o site cai em
> erro de SSL. O Netlify já entrega CDN e HTTPS próprios.

Depois, no Netlify: **Domain management → Add a domain** →
`leonidioboucas.achillesmedia.com.br` → aguarde o certificado (alguns minutos) →
**Force HTTPS**.

---

## 4. Quando comprar o domínio definitivo

1. Aponte `leonidioboucas.com.br` para o Cloudflare (nameservers no registro.br).
2. Na zona nova, crie:
   - `CNAME  www  leonidio-boucas-45999.netlify.app`  (DNS only)
   - `CNAME  @    leonidio-boucas-45999.netlify.app`  (DNS only — o Cloudflare
     resolve o CNAME flattening na raiz automaticamente)
3. No Netlify, defina `leonidioboucas.com.br` como **primary domain** e mantenha o
   subdomínio provisório como alias (o Netlify redireciona sozinho).
4. **No código, troque o domínio de uma vez só:**
   ```bash
   grep -rl "leonidioboucas.achillesmedia.com.br" dist/ | \
     xargs sed -i 's|leonidioboucas.achillesmedia.com.br|leonidioboucas.com.br|g'
   ```
   Isso atualiza `canonical`, `og:url`, `og:image`, `robots.txt` e `sitemap.xml`.

---

## Pendências antes de divulgar

- [ ] Preencher `SITE_CONFIG.whatsappGroupUrl` em `dist/script.js` quando o grupo existir.
- [ ] Preencher `GA_MEASUREMENT_ID` em `dist/analytics.js` (property GA4 deste site).
- [ ] Substituir as fotos por versões oficiais em alta resolução. As atuais estão em
      baixa (`leonidio-oficial.jpg` tem 455×455) e aparecem com pouca nitidez no hero.
- [ ] Validar todos os textos e compromissos com a equipe de campanha.
- [ ] Inserir CNPJ da campanha no rodapé (o campo está reservado em todas as páginas)
      e confirmar com o jurídico os dados exigidos pela legislação eleitoral.
