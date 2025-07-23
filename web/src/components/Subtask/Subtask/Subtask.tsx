import type {
  DeleteSubtaskMutation,
  DeleteSubtaskMutationVariables,
  FindSubtaskById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_SUBTASK_MUTATION: TypedDocumentNode<
  DeleteSubtaskMutation,
  DeleteSubtaskMutationVariables
> = gql`
  mutation DeleteSubtaskMutation($id: Int!) {
    deleteSubtask(id: $id) {
      id
    }
  }
`

interface Props {
  subtask: NonNullable<FindSubtaskById['subtask']>
}

const Subtask = ({ subtask }: Props) => {
  const [deleteSubtask] = useMutation(DELETE_SUBTASK_MUTATION, {
    onCompleted: () => {
      toast.success('Subtask deleted')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteSubtaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete subtask ' + id + '?')) {
      deleteSubtask({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Subtask {subtask.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{subtask.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{subtask.title}</td>
            </tr>
            <tr>
              <th>Done</th>
              <td>{checkboxInputTag(subtask.done)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(subtask.createdAt)}</td>
            </tr>
            <tr>
              <th>Task id</th>
              <td>{subtask.taskId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSubtask({ id: subtask.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(subtask.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Subtask
