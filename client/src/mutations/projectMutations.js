import { gql } from '@apollo/client'

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
      }
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`

const EDIT_PROJECT = gql`
  mutation EditProject(
    $id: ID!
    $name: String
    $description: String
    $status: EditProjectStatus
  ) {
    editProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
      }
    }
  }
`

export { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT }
