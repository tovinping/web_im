export * from './emoji'
export * from './chat'
export * from './msg'
export enum YES_NO {
  YES = 1,
  NO = 0,
}

export enum MSG_TYPE {
  TEXT = '0',
  IMG = '1',
  IMG_TEXT = '2',
  VIDEO = '3',
  VOICE = '4',
  FILE = '5',
}
export enum MSG_STATE {
  NORMAL = 0,
  SENDING = 1,
  WITHDRAW = 2,
  DELETE = 3,
  ERROR = 4,
}

export enum GROUP_STATE {
  NORMAL = '0',
  INVALID = '1',
}

export enum MEMBER_TYPE {
  NORMAL = '0',
  ADMIN = '1',
}
