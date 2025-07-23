export const schema = gql`
  type Subtask {
    id: Int!
    title: String!
    done: Boolean!
    createdAt: DateTime!
    taskId: Int!
    task: Task!
  }

  type Query {
    subtasks: [Subtask!]! @requireAuth
    subtask(id: Int!): Subtask @requireAuth
  }

  input CreateSubtaskInput {
    title: String!
    done: Boolean!
    taskId: Int!
  }

  input UpdateSubtaskInput {
    title: String
    done: Boolean
    taskId: Int
  }

  type Mutation {
    createSubtask(input: CreateSubtaskInput!): Subtask! @requireAuth
    updateSubtask(id: Int!, input: UpdateSubtaskInput!): Subtask! @requireAuth
    deleteSubtask(id: Int!): Subtask! @requireAuth
  }
`
