# desafio_Delivery_Much_Tech_Challenge
desafio Delivery Much Tech Challenge


## Essa é a minha resposta para o desafio



bom começe clonadando o  meu repositorio

git clone git@github.com:GustavoGarciaPereira/desafio_Delivery_Much_Tech_Challenge.git


apos ter clonado com sucesso
cove criar na raiz do projeto
um arquivo chamado .env

com o seguinte conteuro:

API_GIF_KAY=sua_chave_giphy
PORT=3000


apos isso voce roda o comando docker build
docker build -t gustavo/docker-node-tutorial . 

apos rode o comento run do docker e veja o resultado

docker run -p 3000:3000 gustavo/docker-node-tutorial

http://localhost:3000/recipes/onion/tomato