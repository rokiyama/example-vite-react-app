import { useState } from 'react'
import { Button } from '../components/Button'
import { User } from '../components/User'
import { useAppDispatch } from '../redux/hooks'
import { api, useGetUsersQuery } from '../redux/reducers/api'

export const App = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const { data: users } = useGetUsersQuery({
    page: page === 1 ? undefined : page,
  })
  console.log({ page })

  return (
    <>
      <h1 className="text-xl">Users List</h1>
      <div className="flex flex-col items-center justify-center gap-5">
        <Button
          onClick={() => {
            dispatch(api.util.invalidateTags(['User']))
            setPage(1)
          }}
        >
          Reload
        </Button>
        {users?.map((user) => <User key={user.id} user={user} />)}
        <Button
          onClick={() => {
            setPage(page + 1)
          }}
        >
          Load More
        </Button>
      </div>
    </>
  )
}
