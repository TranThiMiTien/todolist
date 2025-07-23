import NewSubtask from 'src/components/Subtask/NewSubtask'

type NewSubtaskPageProps = {
  taskId: number
}

const NewSubtaskPage = ({taskId}:NewSubtaskPageProps) => {
  return <NewSubtask taskId={taskId}/>
}

export default NewSubtaskPage
