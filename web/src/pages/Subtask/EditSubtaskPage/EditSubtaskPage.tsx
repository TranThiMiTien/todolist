import EditSubtaskCell from 'src/components/Subtask/EditSubtaskCell'

type SubtaskPageProps = {
  id: number
}

const EditSubtaskPage = ({ id }: SubtaskPageProps) => {
  return <EditSubtaskCell id={id} />
}

export default EditSubtaskPage
