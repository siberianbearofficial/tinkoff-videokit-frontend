# Tinkoff VideoKit Frontend

Проект создан с использованием [Angular CLI](https://github.com/angular/angular-cli) версии 16.2.0.

## Development

Команда `ng serve` запускает development-сервер на `http://localhost:4200/`. Приложение автоматически перезагружается при изменении какого-либо файла.

## Production

Команда `make build` собирает проект в production-ready **docker** образ, который содержит в себе только необходимые файлы (итоговый образ на основе nginx alpine)
