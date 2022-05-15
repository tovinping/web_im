enum MEMBER_ROLE {
  NORMAL = '0',
  ADMIN = '1',
}
interface IMember {
  account: string
  groupId: string
  type: MEMBER_ROLE
  nickName?: string
}
