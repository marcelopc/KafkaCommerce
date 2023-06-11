import { Kafka, type Consumer, type EachMessagePayload, logLevel } from 'kafkajs'
import { type PedidoService } from '@src/domain/services/pedidosServices'

class PedidoConsumer {
  private readonly consumer: Consumer

  constructor () {
    const kafka = new Kafka({
      clientId: 'pedido-consumer',
      brokers: ['kafka:9092'],
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 300,
        retries: 10
      }
    })

    this.consumer = kafka.consumer({ groupId: 'pedido-group' }) // Insira o ID do grupo de consumidores
  }

  public async iniciarConsumo (pedidoService: PedidoService): Promise<void> {
    try {
      await this.consumer.connect()

      await this.consumer.subscribe({ topic: 'pagamentos' }) // Insira o nome do tópico para os pagamentos

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          const mensagem = JSON.parse(payload.message.value != null ? payload.message.value.toString() : '')

          // Processar a mensagem do pagamento
          console.log('Recebeu uma nova mensagem de pagamento:', mensagem)

          // Verificar o pedido relacionado ao pagamento com base nas informações da mensagem
          const { pedidoId } = mensagem

          const pedido = await pedidoService.buscarPedido(pedidoId)
          if (pedido != null) {
            await pedidoService.updateStatusPedido(pedidoId, 'em andamento')
          }
        }
      })
    } catch (error) {
      console.error('Erro ao iniciar o consumo de pagamentos:', error)
    }
  }
}

export default PedidoConsumer
