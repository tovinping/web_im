export default interface UserType {
  account: string
  name?: string
  mail?: string
  sign?: string
  avatar?: string
}
export type IUserAccount = UserType['account']