import { Kafka, type Producer, type ProducerRecord, logLevel } from 'kafkajs'
import { type Pagamento } from '@src/domain/models/pagamentos'

class PagamentoProducer {
  private readonly _producer: Producer

  constructor () {
    const kafka = new Kafka({
      clientId: 'pagamento-producer',
      brokers: ['kafka:9092'],
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 300,
        retries: 10
      }
    })

    this._producer = kafka.producer()
  }

  public async enviarPagamento (pagamento: Pagamento): Promise<void> {
    try {
      await this._producer.connect()

      const mensagem: ProducerRecord = {
        topic: 'pagamentos', // Insira o nome do tópico para os pagamentos
        messages: [
          {
            value: JSON.stringify(pagamento)
          }
        ]
      }

      await this._producer.send(mensagem)
    } catch (error) {
      console.error('Erro ao enviar pagamento para o Kafka:', error)
    } finally {
      await this._producer.disconnect()
    }
  }
}

export default PagamentoProducer
