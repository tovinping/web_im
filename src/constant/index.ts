export * from './emoji'
export enum YES_NO {
  YES = 1,
  NO =0
}
export enum CHAT_TYPE {
  P2P = '0',
  GROUP = '1',
}

export enum MSG_TYPE {
  TEXT = 0,
  IMAGE = 1,
  VIDEO = 2,
  AUDIO = 3,
  FILE = 4
}
export enum MSG_STATE {
  NORMAL = 0,
  SENDING = 1,
  WITHDRAW = 2,
  DELETE = 3,
  ERROR = 4
}

export enum GROUP_STATE {
  NORMAL = '0',
  INVALID = '1'
}

export enum MEMBER_TYPE {
  NORMAL = '0',
  ADMIN = '1'
}