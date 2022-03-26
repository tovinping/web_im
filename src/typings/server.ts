export interface IResBase<T = any> {
  /** 0成功1失败 */ 
  code: 0 | 1
  body: T | null
  msg: string
}