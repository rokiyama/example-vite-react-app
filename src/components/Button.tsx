import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  children: ReactNode
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white
        hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
