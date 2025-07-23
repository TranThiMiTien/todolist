import type {
  DeleteSubtaskMutation,
  DeleteSubtaskMutationVariables,
  FindSubtasks,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Subtask/SubtasksCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

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

const SubtasksList = ({ subtasks }: FindSubtasks) => {
  const [deleteSubtask] = useMutation(DELETE_SUBTASK_MUTATION, {
    onCompleted: () => {
      toast.success('Subtask deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteSubtaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete subtask ' + id + '?')) {
      deleteSubtask({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Done</th>
            <th>Created at</th>
            <th>Task id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {subtasks.map((subtask) => (
            <tr key={subtask.id}>
              <td>{truncate(subtask.id)}</td>
              <td>{truncate(subtask.title)}</td>
              <td>{checkboxInputTag(subtask.done)}</td>
              <td>{timeTag(subtask.createdAt)}</td>
              <td>{truncate(subtask.taskId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.subtask({ id: subtask.id })}
                    title={'Show subtask ' + subtask.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSubtask({ id: subtask.id })}
                    title={'Edit subtask ' + subtask.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete subtask ' + subtask.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(subtask.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubtasksList
