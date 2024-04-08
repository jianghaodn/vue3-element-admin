import request from "@/utils/request";


export function  updateAannouncement(params) {
    return request({
        url:"/admin/announcement",
        method:"post",
        data:params
    })
}

export function getAnnouncement(){
    return request({
        url:"/api/announcement",
        method:"get"
    })
}