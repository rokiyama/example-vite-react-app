import { useLoaderData } from 'react-router-dom'
import { UserEntity } from '../types/UserEntity'

export const UserDetail = () => {
  const { data: user } = useLoaderData() as { data: UserEntity }

  return (
    <>
      <h1 className="text-xl">User Detail</h1>
      {user ? (
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt="アバター"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h2 className="text-md font-bold">{user.name}</h2>
            <p className="text-base text-gray-700">{user.email}</p>
          </div>
        </div>
      ) : (
        'No user found'
      )}
    </>
  )
}
