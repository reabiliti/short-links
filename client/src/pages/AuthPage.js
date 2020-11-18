import { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      message(data.message)
      console.log(data)
    } catch (e) {}
  }

  return <div className="row">
    <div className="col s6 offset-s3">
      <h1>Short link</h1>

      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div>
            <div className="input-field">
              <input
                placeholder="Enter Email"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                placeholder="Enter Password"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn yellow darken-4 mr-10"
            disabled={loading}
            onClick={loginHandler}
          >
            Sign in
          </button>
          <button
            className="btn grey lighten-1 black-text"
            onClick={registerHandler}
            disabled={loading}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
}

export default AuthPage
