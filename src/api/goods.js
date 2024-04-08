import request from "@/utils/request";

export function getGoodsList(pageQuery) {
  return request({
    url: "/api/goods",
    method: "get",
    params: pageQuery,
  });
}
export function updateGoods(data) {
  return request({
    url: "/api/goods",
    method: "put",
    data
  });
}
export function removeGoods(data) {
  return request({
    url: "/api/goods",
    method: "delete",
    params: data,
  });
}
