import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const { login } = useAuth()

  const onSubmit = async (values) => {
    setServerError('')
    setLoading(true)
    try {
      await login({ email: values.email, password: values.password })
      navigate('/')
    } catch (e) {
      const msg = e?.response?.data?.error || e?.message || 'Login failed'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: form card */}
          <div className="max-w-md w-full mx-auto">
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold">Welcome back</h1>
                <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
              </div>

              {serverError ? (
                <div className="mb-4 rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">
                  {serverError}
                </div>
              ) : null}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    autoComplete="email"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 relative">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="••••••••"
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(v => !v)}
                      className="absolute inset-y-0 right-2 px-2 text-gray-500 hover:text-gray-700 text-sm"
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                    >
                      {showPwd ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    Remember me
                  </label>
                  <Link to="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link to="/register" className="text-indigo-600 hover:underline">Create one</Link>
              </p>
            </div>
          </div>

          {/* Right: visual (hidden on small screens) */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop&crop=entropy"
                alt="Login Illustration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}