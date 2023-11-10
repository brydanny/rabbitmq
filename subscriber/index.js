
'use strict'

const amqp = require('amqplib')
const queue = process.env.QUEUE || 'hello'

const messagesAmount = 6
const wait = 400

function intensiveOperation() {
    let i =1e9
    while(i--){}
}

async function subscriber() {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    await channel.assertQueue(queue)
    //recibimos mensajes
    channel.consume(queue,message => {
        const content = JSON.parse(message.content.toString())

        //simular itensidad
        intensiveOperation()

        console.log(`Recibiendo mensajes de "${queue}" queue`)
        console.log(content)
        //marcalo como revisado y eliminalo
        channel.ack(message)
    }/*, {
        noAck: true
    }*/)
}

subscriber()
    .catch(error => {
        console.error(error)
        process.exit(1)
    })