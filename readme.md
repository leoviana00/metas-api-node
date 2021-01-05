# Projeto

- Backend para uma aplicação de metas

## Tools

- Nodejs
- express
- mongodb
- mongoose
- cors

## Desenvolvendo dentro do container

- Run mongodb
docker run -d --name db -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb

- Run node
docker run --rm -it --link db -v $(pwd)/:/usr/src/app -p 3000:3000 node:15 bash


