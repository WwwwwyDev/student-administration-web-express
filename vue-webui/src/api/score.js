import request from '@/utils/request'

export function getScores(page, limit, cnum, snum) {
    return request({
        url: '/admin/score',
        method: 'get',
        params: { page, limit, cnum, snum }
    })
}

export function addScore(data) {
    return request({
        url: '/admin/score',
        method: 'post',
        data
    })
}

export function deleteScore(id) {
    return request({
        url: '/admin/score/' + id,
        method: 'delete'
    })
}

export function updateScore(data) {
    return request({
        url: '/admin/score/' + data.id,
        method: 'put',
        data
    })
}

export function searchCnum(cnum) {
    return request({
        url: '/admin/course/searchNum/' + cnum,
        method: 'get',
    })
}
export function searchSnum(snum) {
    return request({
        url: '/admin/student/searchNum/' + snum,
        method: 'get',
    })
}