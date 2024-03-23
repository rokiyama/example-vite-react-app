import { Button } from '../components/Button'
import { User } from '../components/User'
import { useGetUsersQuery } from '../redux/reducers/api'

export const App = () => {
  const { data: users } = useGetUsersQuery({})

  return (
    <>
      <h1 className="text-xl">Users List</h1>
      <div className="flex flex-col items-center justify-center gap-5">
        {users?.map((user) => <User key={user.id} user={user} />)}
      </div>
    </>
  )
}
