# decent-web

Simple social media clone of reddit and medium for learning purposes. This repository containes most of the frontend code used in the project.
Although this repository can be used on its own, it is intended to be used in combination with the other decent-app repositories listed in [decent-app](https://github.com/e-dreyer/decent-app.git)

## Cloning the repository

```bash
git clone https://github.com/e-dreyer/decent-web.git
```

## Running without docker

```bash
cd decent-web/
yarn dev
```

## Running with docker

Be sure to include the period at the end of the command

```bash
docker build -t decent-web .
docker start decent-web
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linting and Formating

This project includes a basic linter and formatter as it was developed in NeoVim

```bash
yarn format
yarn lint:fix
```
