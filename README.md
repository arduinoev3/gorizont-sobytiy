# Горизонт Событий · сайт

Публичный лендинг компании «Горизонт Событий». Статический сайт под **GitHub Pages** (корень репозитория).

## Локальный просмотр

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Открыть http://127.0.0.1:8080.

## GitHub Pages

1. Settings → Pages → Build and deployment
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Сайт: `https://arduinoev3.github.io/gorizont-sobytiy/`

Файл `.nojekyll` отключает обработку Jekyll.

## Стек

HTML · CSS · немного JS. Без сборки и серверной логики.
