import fetch from 'auth/FetchInterceptor'
import { env } from 'configs/EnvironmentConfig'

const RoomCategoryService = {}

RoomCategoryService.getCategories = () => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room-categories-all`,
    method: 'get'
  })
}


RoomCategoryService.deleteCategory = (id) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room-categories/${id}`,
    method: 'delete',
  });
};



RoomCategoryService.updateCategory = (id, data) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room-categories/${id}`,
    method: 'put',
    data,
  });
};

RoomCategoryService.createCategory = (data) => {
  return fetch({
    url: `${env.API_ENDPOINT_URL}admin/room-categories`,
    method: 'post',
    data,
  });
};



export default RoomCategoryService