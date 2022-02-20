import request from '@/utils/request'

export function getCourses(page,limit,num,name,teacher){
    return request({
      url:'/admin/course',
      method: 'get',
      params: {page,limit,num,name,teacher}
    })
  }
  
  export function addCourse(data){
    return request({
      url:'/admin/course',
      method: 'post',
      data
    })
  }
  
  export function deleteCourse(id){
    return request({
      url:'/admin/course/' + id,
      method: 'delete'
    })
  }
  
  export function updateCourse(data){
    return request({
      url:'/admin/course/' + data.id,
      method: 'put',
      data
    })
  }
  
  