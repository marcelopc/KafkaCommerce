# KafkaCommerce

Este projeto tem como objetivo implementar um sistema de gerenciamento de pedidos utilizando a arquitetura de microserviços e a plataforma Apache Kafka.
O Projeto de Gerenciamento de Pedidos é uma aplicação desenvolvida em Node.js, utilizando as tecnologias TypeScript, Express e MongoDB. A arquitetura do projeto segue os princípios da Arquitetura Hexagonal (Hexagonal Architecture), que promove a separação de preocupações e a modularidade do sistema.

A aplicação consiste em dois microserviços principais: "Pedidos" e "Pagamentos". O microserviço "Pedidos" é responsável pelo gerenciamento dos pedidos dos clientes, enquanto o microserviço "Pagamentos" cuida do processamento dos pagamentos relacionados a esses pedidos.

A comunicação entre os microserviços é feita por meio do Apache Kafka, uma plataforma de streaming distribuída que permite o envio e recebimento de mensagens entre os diferentes componentes da aplicação. O Kafka garante a escalabilidade, tolerância a falhas e a integração assíncrona entre os serviços.

O fluxo de funcionamento da aplicação é o seguinte:

1. O cliente realiza um pedido por meio do microserviço "Pedidos", informando os itens desejados e o valor total.
2. O microserviço "Pedidos" cria o pedido no banco de dados e aguarda o pagamento ser concluído.
3. Após o pagamento ser concluído no microserviço "Pagamentos", é gerada uma mensagem no Kafka informando a conclusão do pagamento.
4. O microserviço "Pedidos", por meio do consumer, recebe a mensagem do Kafka e atualiza o status do pedido para "em andamento".

## Configuração

Certifique-se de ter o Docker e o Docker Compose instalados no seu sistema.

## Como executar

1. Clone este repositório:

```shell
git clone KafkaCommerce
```

2. Navegue até o diretório do projeto:

```shell
cd KafkaCommerce
```
3. Crie um arquivo `.env` no diretório raiz do projeto e defina as seguintes variáveis de ambiente:

```bash
DB_HOST="db"
DB_PORT="27017"
DB_NAME="kafkacommerce"
DB_USER="root"
DB_PASS="12345678"
MONGO_URI=mongodb://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?authSource=admin
PORT_PEDIDOS="3001"
PORT_PAGAMENTOS="3000"
```
4. Inicie os contêineres Docker:

```shell
make up
```

5. API's
  Pedidos `http://localhost:3001`.
  Pagamentos `http://localhost:3000`.

## Dependências

- Docker
- Docker Compose
- Make

## Estrutura do Projeto

Explicação da estrutura de diretórios das API's:
```
- src
  - app
    - controllers
    - dtos
    - middlewares
    - routes
  - domain
    - models
    - repositories
    - services
  - infrastructure
    - database
      - models
      - repositories
    - kafka
      - producers
      - consumers
  - shared
    - errors
    - utils
  - server.ts
```

breve descrição de cada pasta:

- `src`: Pasta raiz do código-fonte.
- `app`: Contém a camada de aplicação, responsável pela lógica de controle da aplicação.
  - `controllers`: Controllers responsáveis por lidar com as requisições HTTP e chamar os serviços apropriados.
  - `dtos`: Objetos de transferência de dados usados para definir os formatos de entrada e saída dos endpoints.
  - `middlewares`: Middlewares do Express para lidar com questões como autenticação, validação, etc.
  - `routes`: Definição das rotas da API.
- `domain`: Contém a camada de domínio, onde residem as regras de negócio.
  - `models`: Modelos de domínio que representam os objetos de negócio, como o modelo de pedidos.
  - `repositories`: Interfaces que definem as operações de leitura e gravação no banco de dados relacionadas aos pedidos.
  - `services`: Lógica de negócio responsável por manipular os pedidos e coordenar a interação entre os modelos e os repositórios.
- `infrastructure`: Contém a infraestrutura externa, como o banco de dados e o Kafka.
  - `database`: Lida com a interação com o banco de dados MongoDB.
    - `models`: Modelos específicos para o banco de dados MongoDB.
    - `repositories`: Implementações concretas dos repositórios definidos no domínio.
  - `kafka`: Gerencia a comunicação com o Kafka, se necessário.
    - `producers`: Produtores que publicam eventos relacionados aos pedidos no Kafka.
    - `consumers`: Consumidores que consomem eventos do Kafka relacionados aos pedidos.
- `shared`: Contém código compartilhado entre diferentes partes da aplicação.
  - `errors`: Definição de classes de erros personalizados.
  - `utils`: Funções utilitárias ou helpers.

Por fim, `server.ts` é o arquivo de entrada principal onde você iniciará o servidor Express e definirá as configurações gerais.

## Contribuição

As contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).




