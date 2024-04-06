import { HttpResponse, http } from 'msw'
import { server } from '../__mocks__/server'

it('api success', async () => {
  const res = await fetch('https://example.com/greeting')
  expect(await res.json()).toStrictEqual({ greeting: 'hello there' })
})

it('api error', async () => {
  server.use(
    http.get('https://example.com/greeting', () => {
      return new HttpResponse(null, { status: 500 })
    }),
  )
  const res = await fetch('https://example.com/greeting')
  expect(res.status).toBe(500)
})
