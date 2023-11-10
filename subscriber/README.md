## Docker (RABBITMQ)

## Ejecutar contenedor
```bash
$ docker run -d -v $(pwd)/rabbit-db:/var/lib/rabbitmq --hostname my-rabbit -p 5672:5672 -p 8081:15672 --name my-rabbit rabbitmq:3-management
```
## Installation

```bash
$ npm install
```

## Ejecutar PUBLISHER
```bash
$ node publisher/index.js
```

## Ejecutar SUBSCRIBER

```bash
$ node subscriber/index.js
```


## Levantar management RabbitMQ

## Ingresar al browser
# http://localhost:8081