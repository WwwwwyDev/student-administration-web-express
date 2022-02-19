import request from '@/utils/request'

export function getStudents(page,limit,num,name,grade,_class,sex){
    return request({
      url:'/admin/student',
      method: 'get',
      params: {page,limit,num,name,grade,_class,sex}
    })
  }
  
  export function addStudent(data){
    return request({
      url:'/admin/student',
      method: 'post',
      data
    })
  }
  
  export function deleteStudent(id){
    return request({
      url:'/admin/student/' + id,
      method: 'delete'
    })
  }
  
  export function updateStudent(data){
    return request({
      url:'/admin/student/' + data.id,
      method: 'put',
      data
    })
  }
  
  