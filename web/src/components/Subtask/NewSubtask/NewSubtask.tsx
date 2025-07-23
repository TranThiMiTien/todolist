import type {
  CreateSubtaskMutation,
  CreateSubtaskInput,
  CreateSubtaskMutationVariables,
} from 'types/graphql'



import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SubtaskForm from 'src/components/Subtask/SubtaskForm'

const CREATE_SUBTASK_MUTATION: TypedDocumentNode<
  CreateSubtaskMutation,
  CreateSubtaskMutationVariables
> = gql`
  mutation CreateSubtaskMutation($input: CreateSubtaskInput!) {
    createSubtask(input: $input) {
      id
    }
  }
`

const NewSubtask = ({taskId}) => {

  console.log("daaaaa:::",taskId);

  const [createSubtask, { loading, error }] = useMutation(
    CREATE_SUBTASK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subtask created')
        navigate(routes.tasks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )




  const onSave = (input: CreateSubtaskInput) => {
    createSubtask({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Subtask</h2>
      </header>
      <div className="rw-segment-main">
        <SubtaskForm onSave={onSave} loading={loading} error={error} taskId={taskId}/>
      </div>
    </div>
  )
}

export default NewSubtask
