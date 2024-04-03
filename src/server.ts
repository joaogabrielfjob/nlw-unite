import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-event'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createEvent)
server.register(registerForEvent)
server.register(getEvent)
server.register(getAttendeeBadge)

server
  .listen({ port: 7777 })
  .then(() => console.log('🚀 HTTP server running!'))