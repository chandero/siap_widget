
import request from '@/utils/request'
export function apiKey() {
  return request({
    url: '/geo/web/key/43f44388-5cd1-4657-9f7e-ea4e014e9333',
    method: 'get'
  })
}
