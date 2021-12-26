const config = {
  baseUrl: 'https://api.tovinping.cn'
}
if (process.env.NODE_ENV === 'development') {
  config['baseUrl'] = 'http://127.0.0.1:4000'
}
export default config