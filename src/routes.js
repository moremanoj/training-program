module.exports = [
  {
    prefix: '/products',
    pin: 'area:product,action:*',
    map: {
      list: { GET: true },
      add:  { POST: true }
    }
  },
  {
    prefix: '/',
    pin: 'area:user,action:*',
    map: {
      list: { GET: true },
      add : { POST: true }}
  }]
