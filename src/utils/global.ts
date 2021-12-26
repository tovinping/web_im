interface IOpenParam {
  selected?: string[]
}

export function openContactSelect(param?: IOpenParam) {
  return new Promise<IUserType[]>(resolve => {
    window.$dispatch({
      type: 'updateContactSelect',
      payload: {visible: true, selected: param?.selected, callback: resolve}})
  })
}