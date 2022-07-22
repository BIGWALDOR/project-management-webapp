import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { GET_PROJECT } from '../queries/projectQueries'
import { EDIT_PROJECT } from '../mutations/projectMutations'

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState('')

  const [editProject] = useMutation(EDIT_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !description || !status) {
      return alert('Please fill out all fields')
    }

    editProject(name, description, status)
  }

  return (
    <div className='mt-5'>
      <h3>Edit Project</h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea
            type='description'
            className='form-control'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Status</label>
          <select
            type='text'
            className='form-select'
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='NEW'>Not Started</option>
            <option value='IN_PROGRESS'>In Progress</option>
            <option value='COMPLETED'>Completed</option>
          </select>
        </div>
        <button
          type='submit'
          data-bs-dismiss='modal'
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
