import request from '@/utils/request'

export function getGeoreferenciaLuminarias(barr_id, aap_tecnologia, aap_potencia, aap_id) {
  return request({
    url: `/geo/web/1/${barr_id}/${aap_tecnologia}/${aap_potencia}/${aap_id}/43f44388-5cd1-4657-9f7e-ea4e014e9333`,
    method: 'get',
  });
}
