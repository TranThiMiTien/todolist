import type { Meta, StoryObj } from '@storybook/react'

import SubtaskPage from './SubtaskPage'

const meta: Meta<typeof SubtaskPage> = {
  component: SubtaskPage,
}

export default meta

type Story = StoryObj<typeof SubtaskPage>

export const Primary: Story = {}
