export const schema = gql`
  type Task {
    id: Int!
    title: String!
    completed: Boolean!
    createdAt: DateTime!
    subtasks: [Subtask!]! # Thêm dòng này
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    title: String!
    completed: Boolean!
  }

  input UpdateTaskInput {
    title: String
    completed: Boolean
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
