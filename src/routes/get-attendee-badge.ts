import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function getAttendeeBadge(server: FastifyInstance) {
  server
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/attendee/:attendeeId/badge',
      {
        schema: {
          params: z.object({
            attendeeId: z.coerce.number().int(),
          }),
          response: { }
        }
      },
      async (request, repply) => {
        const { attendeeId } = request.params

        const attendee = await prisma.attendee.findUnique({
          select: {
            name: true,
            email: true,

            event: {
              select: {
                title: true
              }
            }
          },
          where: {
            id: attendeeId
          }
        })

        if (attendee === null) {
          throw new Error('Attendee not found.')
        }

        return repply.send({ attendee })
      }
    )
}