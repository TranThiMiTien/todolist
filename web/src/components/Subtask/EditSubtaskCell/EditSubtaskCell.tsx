import type {
  EditSubtaskById,
  UpdateSubtaskInput,
  UpdateSubtaskMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SubtaskForm from 'src/components/Subtask/SubtaskForm'

export const QUERY: TypedDocumentNode<EditSubtaskById> = gql`
  query EditSubtaskById($id: Int!) {
    subtask: subtask(id: $id) {
      id
      title
      done
      createdAt
      taskId
    }
  }
`

const UPDATE_SUBTASK_MUTATION: TypedDocumentNode<
  EditSubtaskById,
  UpdateSubtaskMutationVariables
> = gql`
  mutation UpdateSubtaskMutation($id: Int!, $input: UpdateSubtaskInput!) {
    updateSubtask(id: $id, input: $input) {
      id
      title
      done
      createdAt
      taskId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subtask }: CellSuccessProps<EditSubtaskById>) => {
  const [updateSubtask, { loading, error }] = useMutation(
    UPDATE_SUBTASK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subtask updated')
        navigate(routes.tasks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSubtaskInput,
    id: EditSubtaskById['subtask']['id']
  ) => {
    updateSubtask({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Subtask {subtask?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SubtaskForm
          subtask={subtask}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
