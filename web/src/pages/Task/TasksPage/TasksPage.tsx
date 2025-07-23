import gql from 'graphql-tag'
import { navigate, routes } from '@redwoodjs/router'
import { useQuery, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const DELETE_SUB_TASK_MUTATION = gql`
  mutation DeleteSubtaskMutation($id: Int!) {
    deleteSubtask(id: $id) {
      id
    }
  }
`

const QUERY = gql`
  query FindTasks {
    tasks {
      id
      title
      completed
      subtasks {
        id
        title
        done
      }
    }
  }
`

export default function TasksPage() {
  const { data, loading, error } = useQuery(QUERY)

  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    onCompleted: () => {
      toast.success('Đã xóa task thành công')
    },
    onError: (error) => {
      toast.error('Lỗi khi xóa task: ' + error.message)
    },
  })

  const [deleteSubTask] = useMutation(DELETE_SUB_TASK_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    onCompleted: () => {
      toast.success('Đã xóa sub task thành công')
    },
    onError: (error) => {
      toast.error('Lỗi khi xóa subtask: ' + error.message)
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

  const handleDetailSub = (id: number) => {
    navigate(routes.subTask({ id }))
  }

  const handleEditSub = (id: number) => {
    navigate(routes.editSubtask({ id }))
  }

  const handleAddSubTask = (taskId: number) => {
    navigate(routes.newSubTask({ taskId }))
  }

  if (loading) return <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>
  if (error) return <p className="text-red-500 text-center">Lỗi: {error.message}</p>

  return (
    <div className="max-w-3xl mx-auto px-4 mt-8">
      <ul className="space-y-6">
        {data?.tasks?.map((task) => (
          <li key={task.id}>
            {/* Task Title + Buttons */}
            <div className="flex items-center justify-between">
              <div
                className="font-semibold cursor-pointer hover:text-blue-600 text-[25px]"
                onClick={() => handleRead(task.id)}
              >
                {task.title}{' '}
                {task.completed && <span className="text-green-600">(Đã xong)</span>}
              </div>
              <div className="flex items-center gap-2 text-sm text-[20px]">
                <button
                  onClick={() => handleAddSubTask(task.id)}
                  className="text-blue-600 hover:underline"
                >
                  + thêm subtask
                </button>
                <button
                  onClick={() => handleEdit(task.id)}
                  className="text-gray-600 hover:underline text-[20px]"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:underline text-[20px]"
                >
                  Xóa
                </button>
              </div>
            </div>
            {/* Subtasks */}
            <div className="mt-2 space-y-1 pl-4 border-l border-gray-300">
              {task.subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between">
                  <span
                    className="cursor-pointer hover:text-blue-700 text-sm text-[18px]"
                    onClick={() => handleDetailSub(sub.id)}
                  >
                    * {sub.title} {sub.done ? '(xong)' : ''}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[18px]">
                    <button
                      onClick={() => handleEditSub(sub.id)}
                      className="text-gray-600 hover:underline"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Bạn có chắc muốn xóa subtask này không?')) {
                          deleteSubTask({ variables: { id: sub.id } })
                        }
                      }}
                      className="text-red-600 hover:underline text-[18px]"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
