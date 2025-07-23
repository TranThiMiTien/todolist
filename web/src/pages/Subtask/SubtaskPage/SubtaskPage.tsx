import SubtaskCell from 'src/components/Subtask/SubtaskCell'

type SubtaskPageProps = {
  id: number
}

const SubtaskPage = ({ id }: SubtaskPageProps) => {
  return <SubtaskCell id={id} />
}

export default SubtaskPage
