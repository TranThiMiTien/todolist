import type { FindSubtaskById, FindSubtaskByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Subtask from 'src/components/Subtask/Subtask'

export const QUERY: TypedDocumentNode<
  FindSubtaskById,
  FindSubtaskByIdVariables
> = gql`
  query FindSubtaskById($id: Int!) {
    subtask: subtask(id: $id) {
      id
      title
      done
      createdAt
      taskId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Subtask not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSubtaskByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  subtask,
}: CellSuccessProps<FindSubtaskById, FindSubtaskByIdVariables>) => {
  return <Subtask subtask={subtask} />
}
