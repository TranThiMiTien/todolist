import type { Prisma, Subtask } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SubtaskCreateArgs>({
  subtask: {
    one: { data: { title: 'String', task: { create: { title: 'String' } } } },
    two: { data: { title: 'String', task: { create: { title: 'String' } } } },
  },
})

export type StandardScenario = ScenarioData<Subtask, 'subtask'>
