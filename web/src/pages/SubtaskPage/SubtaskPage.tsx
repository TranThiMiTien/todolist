// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const SubtaskPage = () => {
  return (
    <>
      <Metadata title="Subtask" description="Subtask page" />

      <h1>SubtaskPage</h1>
      <p>
        Find me in <code>./web/src/pages/SubtaskPage/SubtaskPage.tsx</code>
      </p>
      {/*
          My default route is named `subtask`, link to me with:
          `<Link to={routes.subtask()}>Subtask</Link>`
      */}
    </>
  )
}

export default SubtaskPage
