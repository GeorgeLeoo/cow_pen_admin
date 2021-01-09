import HttpRequest from '../libs/HttpRequest'

/**
 * 添加一级科目
 * @param courseName 课程名称
 */
export const addLevelOne = (courseName: string) => HttpRequest.request({
  url: '/course',
  method: 'post',
  data: { courseName }
})

/**
 * 删除一级课程
 * @param id 课程id
 * @param courseName 课程名称
 */
export const updateCourseOneById = (id: number, courseName: string) => HttpRequest.request({
  url: '/course',
  method: 'patch',
  data: { id, courseName }
})

/**
 * 删除一级课程
 * @param id 课程id
 */
export const deleteCourseOneById = (id: number) => HttpRequest.request({
  url: '/course',
  method: 'delete',
  data: { id }
})

/**
 * 添加2级科目
 * @param courseName 课程名称
 */
export const addLevelTwo = (courseLevelOneId: number, courseName: string) => HttpRequest.request({
  url: '/course',
  method: 'post',
  data: { courseLevelOneId, courseName }
})

/**
 * 删除2级课程
 * @param id 课程id
 * @param courseName 课程名称
 */
export const updateCourseTwoById = (id: number, courseName: string) => HttpRequest.request({
  url: '/course/two',
  method: 'patch',
  data: { id, courseName }
})

/**
 * 删除2级课程
 * @param id 课程id
 */
export const deleteCourseTwoById = (id: number) => HttpRequest.request({
  url: '/course/two',
  method: 'delete',
  data: { id }
})
