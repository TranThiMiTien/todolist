import { useQuery, useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import gql from 'graphql-tag'
import { toast } from '@redwoodjs/web/toast'

const QUERY = gql`
  query FindTasks {
    tasks {
      id
      title
      completed
    }
  }
`

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

export default function TasksPage() {

  const { data, loading, error } = useQuery(QUERY)

  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    onCompleted: () => {
       toast.success('Đã xóa task thành công')
      console.log('Oke... Đã xóa task thành công')
    },
    onError: (error) => {
      console.error('X... Lỗi khi xóa task:', error.message)
    },
  })

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa task này không?')) {
      deleteTask({ variables: { id } })
    }
  }

const handleEdit = (id: number) => {
  navigate(routes.editTask({ id }))
}
const handleRead = (id: number) => {
  navigate(routes.task({ id }))
}


  if (loading) return <p>Loading...</p>
  if (error) return <p>Lỗi: {error.message}</p>

  return (
    <div>
      <h2>Danh sách Task</h2>
      <ul>
        {data?.tasks?.map((task) => (
          <li key={task.id} >

            <span style={{cursor:"pointer"
            }} onClick = {() => handleRead(task.id)} > {task.title} {task.completed ? '(Đã xong)' : ''}</span>
            <button onClick={() => handleEdit(task.id)} style={{ marginLeft: 10, cursor:'pointer' }}>
              Sửa
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              style={{ marginLeft: 5, color: 'red', cursor:'pointer' }}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
