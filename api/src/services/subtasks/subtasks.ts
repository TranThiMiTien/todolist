import type {
  QueryResolvers,
  MutationResolvers,
  SubtaskRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const subtasks: QueryResolvers['subtasks'] = () => {
  return db.subtask.findMany()
}

export const subtask: QueryResolvers['subtask'] = ({ id }) => {
  return db.subtask.findUnique({
    where: { id },
  })
}

export const createSubtask: MutationResolvers['createSubtask'] = ({
  input,
}) => {
  return db.subtask.create({
    data: input,
  })
}

export const updateSubtask: MutationResolvers['updateSubtask'] = ({
  id,
  input,
}) => {
  return db.subtask.update({
    data: input,
    where: { id },
  })
}

export const deleteSubtask: MutationResolvers['deleteSubtask'] = ({ id }) => {
  return db.subtask.delete({
    where: { id },
  })
}

export const Subtask: SubtaskRelationResolvers = {
  task: (_obj, { root }) => {
    return db.subtask.findUnique({ where: { id: root?.id } }).task()
  },
}
