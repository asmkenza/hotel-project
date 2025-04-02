import fetch from 'auth/FetchInterceptor';
import { env } from 'configs/EnvironmentConfig';

const RoomsService = {};

RoomsService.getRooms = () => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/rooms`,
    method: 'get',
  });
};

RoomsService.getRoom = (id) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room/${id}`,
    method: 'get',
  });
};


RoomsService.deleteRoom = (id) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room/${id}`,
    method: 'delete',
  });
};


RoomsService.updateRoom = (id, data) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room/${id}`,
    method: 'put',
    data,
  });
};

RoomsService.createRoom = (data) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room-create`,
    method: 'post',
    data,
  });
};

RoomsService.getCategories = () => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room-categories-all`,
    method: 'get',
  });
};


export default RoomsService;
