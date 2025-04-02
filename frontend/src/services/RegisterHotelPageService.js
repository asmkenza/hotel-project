import fetch from 'auth/FetchInterceptor';
import { env } from 'configs/EnvironmentConfig';

const RegisterHotelPageService = {};

RegisterHotelPageService.createHotel = (data) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/createHotel`,
    method: 'post',
    data,
  });
};

export default RegisterHotelPageService;
