
'use strict'

const amqp = require('amqplib')
const queue = process.env.QUEUE || 'hello'

const messagesAmount = 6
const wait = 400

function sleep(ms) {
    return new Promise((resolve) =>{
        setTimeout(resolve, ms)
    })
}

async function sleepLoop(number, cb) {
    while(number--){
        await sleep(wait)

        cb()
    }
}

async function exitAfterSend() {
    await sleep (messagesAmount * wait * 1.2)
    process. exit(0)
}

async function subscriber() {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    await channel.assertQueue(queue)
    //enviamos 6 mensajes
    sleepLoop(messagesAmount, async() => {
        const message = {
            id: Math.random().toString(32).slice(2,6),
            text: 'Hola mundo!!'
        }
    
        const sent = channel.sendToQueue(queue, Buffer.from( 
            JSON.stringify(message)
        ), {
            //persistent: true
        })
        sent ?
          console.log(`Enviando a "${queue}" queue`, message) :
          console.log(`Fallo el envio  "${queue}" queue`, message ) 
    })
    /*
    //mensajes individuales
    const message = {
        id: Math.random().toString(32).slice(2,6),
        text: 'Hola mundo!!'
    }

    const sent = channel.sendToQueue(queue, Buffer.from( 
        JSON.stringify(message)
    ))
    sent ?
      console.log(`Enviando a "${queue}" queue`, message) :
      console.log(`Fallo el envio  "${queue}" queue`, message ) */ 
}

subscriber()
    .catch(error => {
        console.error(error)
        process.exit(1)
    })