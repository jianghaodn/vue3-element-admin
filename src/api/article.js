import request from '@/utils/request';

export function fetchList(query) {
  return request({
    url: '/api/article',
    method: 'get',
    params: query
  });
}

export function fetchArticle(id) {
  return request({
    url: '/admin/ article/detail',
    method: 'get',
    params: { id }
  });
}

export function fetchPv(pv) {
  return request({
    url: '/admin/article/pv',
    method: 'get',
    params: { pv }
  });
}

export function createArticle(data) {
  return request({
    url: '/api/article',
    method: 'post',
    data
  });
}

export function updateArticle(data) {
  return request({
    url: '/api/article',
    method: 'put',
    data
  });
}
export function deleteArticle(data) {
  return request({
    url: '/api/article',
    method: 'delete',
    params:data
  });
}


export function getTop(){
  return request({
    url:"/api/article/top",
    method:"get"
  })
}
