import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'

import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'
import { ADD_PROJECT } from '../mutations/projectMutation'

export default function AddProjectModal() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('NEW')
  const [clientId, setClientId] = useState('')

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS })

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      })
    },
  })

  const { loading, error, data } = useQuery(GET_CLIENTS)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name === '' || description === '' || status === '') {
      alert('Please fill out all fields')
    }

    addProject(name, description, status, clientId)
    setName('')
    setDescription('')
    setStatus('NEW')
    setClientId('')
  }

  if (loading) return null
  if (error) return `Error! ${error.message}`

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addProjectModal'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModalLabel'>
                    New Project
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
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
                      <input
                        type='description'
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        type='clientId'
                        className='form-select'
                        id='clientId'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
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
                      className='btn btn-secondary'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
