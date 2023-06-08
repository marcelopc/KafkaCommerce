import crypto from 'crypto'

const hash = (text: string): string => crypto.createHmac('sha256', process.env.ENCRYPT_SECRET as string).update(text).digest('base64')
const uuid = (): string => crypto.randomUUID()

const crypt = {
  hash,
  uuid
}

export default crypt
