import http from '../util/axios'

function getDemo(params) {
  return http({
    url: '/demo/test/1',
    method: 'post',
    data: params
  })
}

export {
  getDemo
}
