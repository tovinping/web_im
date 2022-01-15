export enum TOP_STATE {
  normal = '0',
  isTop = '1',
}
export enum CHAT_TYPE {
  p2p = '0',
  group = '1',
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