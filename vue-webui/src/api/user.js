import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/userinfo',
    method: 'get',
    // params: { token }
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

export function getUsers(page,limit,username){
  return request({
    url:'/admin/user',
    method: 'get',
    params: {page,limit,username}
  })
}


export function addUser(data){
  return request({
    url:'/admin/user',
    method: 'post',
    data
  })
}

export function deleteUser(id){
  return request({
    url:'/admin/user/' + id,
    method: 'delete'
  })
}

export function updateUser(data){
  return request({
    url:'/admin/user/' + data.id,
    method: 'put',
    data
  })
}

