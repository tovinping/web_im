interface IUser {
  account: string
  name?: string
  mail?: string
  sign?: string
  avatar?: string
}
type IAccount = IUser['account']
