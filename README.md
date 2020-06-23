# desafio_Delivery_Much_Tech_Challenge
desafio Delivery Much Tech Challenge


## Essa é a minha resposta para o desafio


### Passo (1)
bom começe clonadando o  meu repositorio
git clone git@github.com:GustavoGarciaPereira/desafio_Delivery_Much_Tech_Challenge.git



### Passo (2)
apos ter clonado com sucesso
criar na raiz do projeto
um arquivo chamado .env

com o seguinte conteuro:

API_GIF_KAY=sua_chave_giphy
PORT=3000

### Passo (3)
apos isso voce roda o comando docker build
docker build -t gustavo/docker-node-tutorial . 

apos rode o comento run do docker e veja o resultado


### Passo (4)
docker run -p 3000:3000 gustavo/docker-node-tutorial



### Passo (5)
http://localhost:3000/recipes/onion/tomato