# Portafolio de Santiago

Sitio estático (HTML, CSS y JavaScript, sin dependencias) con mis proyectos, habilidades y contacto.

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8080
```

## Editar contenido

Todo el texto está en `index.html`. Busca los comentarios `EDITA:` para cambiar el correo, LinkedIn y la sección "Sobre mí".
Para agregar un proyecto, copia un bloque `<article class="proyecto">` y ajusta `data-tags` (`django`, `react` o `html`).

## Despliegue (GitHub Pages)

1. El repositorio es `santiago203485-blip/me`.
2. En GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
3. Cada `git push` a `main` publica los cambios en https://santiago203485-blip.github.io/me/ en 1–2 minutos.
