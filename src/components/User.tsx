import { Link } from 'react-router-dom'
import { UserEntity } from '../types/UserEntity'

type Props = {
  user: UserEntity
}

export const User = ({ user: { id, name, avatar } }: Props) => {
  return (
    <Link to={`/user/${id}`}>
      <div
        className="my-2 mb-4 flex cursor-pointer flex-col rounded bg-white px-8
          pb-8 pt-6 shadow-md"
      >
        <div className="flex items-center space-x-4">
          <img src={avatar} alt="アバター" className="h-10 w-10 rounded-full" />{' '}
          <div>
            <h2 className="text-md font-bold">{name}</h2>
          </div>
        </div>
      </div>
    </Link>
  )
}
