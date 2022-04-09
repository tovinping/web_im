export function scrollBottom(ele: INullType<Element>) {
  if (!ele) return
  ele.scrollTop = ele.scrollHeight
}
export function scrollTop(ele: INullType<Element>) {
  if (!ele) return
  ele.scrollTop = 0
}
