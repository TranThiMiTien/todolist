import type { FindSubtasks, FindSubtasksVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Subtasks from 'src/components/Subtask/Subtasks'

export const QUERY: TypedDocumentNode<FindSubtasks, FindSubtasksVariables> =
  gql`
    query FindSubtasks {
      subtasks {
        id
        title
        done
        createdAt
        taskId
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No subtasks yet.{' '}
      <Link to={routes.newSubtask()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindSubtasks>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  subtasks,
}: CellSuccessProps<FindSubtasks, FindSubtasksVariables>) => {
  return <Subtasks subtasks={subtasks} />
}
