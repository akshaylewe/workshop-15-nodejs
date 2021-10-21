const amqp = require('amqplib/callback_api')
amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err
    }
    let queueName = 'warning'
    channel.assertQueue(queueName, { durable: false })
    channel.consume(queueName, msg => {
      console.log(`Received: ${msg.content.toString()}`)
      channel.ack(msg)
    })
  })
})
