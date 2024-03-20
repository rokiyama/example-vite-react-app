import { Button } from './components/Button'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { increment, selectCount } from './redux/reducers/count'

function App() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)

  return (
    <>
      <h1 className="text-xl">Counter</h1>
      <div className="flex items-center justify-center gap-5">
        {count}
        <Button onClick={() => dispatch(increment())}>Increment</Button>
      </div>
    </>
  )
}

export default App
