import request from "@/utils/request";


export function getOrderList(){
    return request({
        url:"/admin/order",
        method:"get"
    })
}