import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '3c9e0dcb-39b4-4e08-874d-899f9410b4fe',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120
    }
  })
}

seed().then(() => 'Database seeded!')