const config = {
  baseUrl: 'https://tovinping.cn'
}
if (process.env.NODE_ENV === 'development') {
  config['baseUrl'] = 'http://localhost:4000'
}
export default config