import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [err, setErr] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showCPw, setShowCPw] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const pw = watch('password', '')

  const onSubmit = async (values) => {
    setErr('')
    try {
      await registerUser({
        username: values.username,
        email: values.email,
        password: values.password
      })
      navigate('/')
    } catch (e) {
      setErr(e?.response?.data?.message || e?.response?.data?.error || 'Registration failed. Try again.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-3 sm:px-6 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: form */}
        <div className="bg-white border rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-semibold mb-1">Create account</h1>
          <p className="text-sm text-gray-600 mb-6">
            Join to save properties, compare, and contact agents.
          </p>

          {err ? (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
              {err}
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="alexj"
                {...register('username', { required: 'Username is required', minLength: { value: 2, message: 'Min 2 characters' } })}
              />
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
                })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="w-full rounded-md border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute inset-y-0 right-2 my-auto text-sm text-gray-600 hover:text-gray-800"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm password</label>
              <div className="relative">
                <input
                  type={showCPw ? 'text' : 'password'}
                  className="w-full rounded-md border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                  {...register('confirmPassword', {
                    required: 'Confirm your password',
                    validate: (v) => v === pw || 'Passwords do not match'
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowCPw(v => !v)}
                  className="absolute inset-y-0 right-2 my-auto text-sm text-gray-600 hover:text-gray-800"
                  aria-label={showCPw ? 'Hide password' : 'Show password'}
                >
                  {showCPw ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>

            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-brand underline">Log in</Link>
            </p>
          </form>
        </div>

        {/* Right: promo / illustration (hidden on small screens) */}
        <div className="hidden md:flex rounded-lg overflow-hidden border bg-gradient-to-br from-emerald-50 to-sky-50">
          <div className="p-8 lg:p-10 self-center">
            <h2 className="text-xl font-semibold mb-2">Find your next home</h2>
            <p className="text-sm text-gray-600 mb-6">
              Save favorites, compare properties, and contact agents directly from your dashboard.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Responsive design for all devices</li>
              <li>• Map view with property markers</li>
              <li>• Secure account and quick access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}