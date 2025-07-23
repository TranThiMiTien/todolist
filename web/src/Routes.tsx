// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

// import EditSubtaskPage from './pages/Subtask/EditSubtaskPage/EditSubtaskPage'
// import NewSubtaskPage from './pages/Subtask/NewSubtaskPage/NewSubtaskPage'
// import TaskSubtaskPage from './pages/Subtask/SubtaskPage/SubtaskPage'


// Các route phía dứoi hk cần import là do ngay chỗ page đặt tên theo kiểu tên folder rồi đên tên file.tsx
//import NewSubtaskPage from './pages/Subtask/NewSubtaskPage/NewSubtaskPage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Tasks" titleTo="tasks" buttonLabel="Add New Task" buttonTo="newTask">
        <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
        <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
        <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />

        <Route path="/tasks" page={TaskTasksPage} name="tasks" />

        <Route path="/subTasks/{taskId:Int}/new" page={SubtaskNewSubtaskPage} name="newSubTask" />
        <Route path="/subTasks/{id:Int}" page={SubtaskSubtaskPage} name="subTask" />
        <Route path="/subTasks/{id:Int}/edit" page={SubtaskEditSubtaskPage} name="editSubtask" />

      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}
export default Routes
