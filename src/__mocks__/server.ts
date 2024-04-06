import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const server = setupServer(
  http.get('https://example.com/greeting', () => {
    return HttpResponse.json({ greeting: 'hello there' })
  }),
)
