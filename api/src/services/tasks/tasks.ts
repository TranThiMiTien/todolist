// api/src/services/tasks/tasks.ts

import type { QueryResolvers, MutationResolvers, TaskRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

// Query: lấy tất cả task
// export const tasks: QueryResolvers['tasks'] = () => {
//   return db.task.findMany()
// }

export const tasks: QueryResolvers['tasks'] = () => {
  // return db.task.findMany()
  return db.task.findMany({
    orderBy: {
        id:'asc'
    }
  })
}

// Query: lấy 1 task theo id
export const task: QueryResolvers['task'] = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

// Mutation: tạo task mới
export const createTask: MutationResolvers['createTask'] = ({ input }) => {
  console.log('input:: ', input)
  return db.task.create({
    data: input,
  })
}

// Mutation: cập nhật task
export const updateTask: MutationResolvers['updateTask'] = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

// Mutation: xoá task
export const deleteTask: MutationResolvers['deleteTask'] = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task: TaskRelationResolvers={
  subtasks:(_obj, {root })=>{
    return db.task.findUnique({
      where: {id:root.id}
    }).subtasks(
      {orderBy: {
        id:'asc'
        }
      }
    )
  }
}

