import { UserEntity } from '../types/UserEntity'

type Props = {
  user: UserEntity
}

export const User = ({ user: { email, name, avatar } }: Props) => {
  return (
    <div
      className="my-2 mb-4 flex flex-col rounded bg-white px-8 pb-8 pt-6
        shadow-md"
    >
      <div className="flex items-center space-x-4">
        <img src={avatar} alt="アバター" className="h-10 w-10 rounded-full" />{' '}
        {/* アバター画像 */}
        <div>
          <h2 className="text-md font-bold">{name}</h2>
          <p className="text-base text-gray-700">{email}</p>
        </div>
      </div>
    </div>
  )
}
