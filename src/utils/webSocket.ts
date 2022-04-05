import { Manager, Socket } from 'socket.io-client'
import { handleReceiveMsg } from 'src/service'
class ClientSocket {
  static socket: Socket
  static init(account: string, token: string) {
    if (this.socket) return
    const manager = new Manager('ws://localhost:4001', { transports: ['websocket'] })
    this.socket = manager.socket('/', { auth: { token, account } })

    this.socket.on('connect', () => {
      console.log(`connected= ${this.socket.id}`)
      this.onMessage()
      this.onConnectError()
      this.disConnect()
    })
  }
  static onConnectError() {
    this.socket.on('connect_error', (err: any) => {
      console.log('connect_error:', err)
    })
  }
  static disConnect() {
    this.socket.on('disconnect', () => {
      console.log(`disconnect`)
    })
  }
  static onMessage() {
    this.socket.on('message', handleReceiveMsg)
  }
  static createMsgBase() {
    return {}
  }

  static sendMsg(data: IMsgType) {
    return new Promise<{ isOk: boolean; msg: IMsgType; tips: string }>(resolve => {
      this.socket.send(data, (res: any) => {
        resolve(res)
      })
    })
  }
}

export default ClientSocket
