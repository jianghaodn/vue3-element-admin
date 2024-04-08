import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/user/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/api/user/0",
    method: "get",
    params: { token },
  });
}

export function logout(token) {
  return request({
    url: "/api/user/logout",
    method: "post",
    // params: { token }
  });
}

export function getUserList(params) {
  return request({
    url: "/api/user",
    method: "get",
    params: params,
  });
}

export function editUser(data) {
  return request({
    url: "/api/user",
    method: "put",
    data,
  });
}

export function removeUser(data) {
  return request({
    url: "/api/user",
    method: "delete",
    params: data,
  });
}
export function addUser(data) {
  return request({
    url: "/api/user/register",
    method: "POST",
    data
  });
}
