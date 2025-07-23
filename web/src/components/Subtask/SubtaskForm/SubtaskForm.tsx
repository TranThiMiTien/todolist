// === SubtaskForm.tsx ===
import type { EditSubtaskById, UpdateSubtaskInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormSubtask = NonNullable<EditSubtaskById['subtask']>

interface SubtaskFormProps {
  subtask?: EditSubtaskById['subtask']
  onSave: (data: UpdateSubtaskInput, id?: FormSubtask['id']) => void
  error: RWGqlError
  loading: boolean
  taskId?: number
}

const SubtaskForm = (props: SubtaskFormProps) => {
  const onSubmit = (data: FormSubtask) => {
    // Set taskId từ props nếu chưa có
    data.taskId = props.subtask?.taskId || props.taskId
    props.onSave(data, props?.subtask?.id)
  }
  console.log("props::",props)

  return (
    <div className="rw-form-wrapper">
      <Form<FormSubtask> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.subtask?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="done"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Done
        </Label>

        <CheckboxField
          name="done"
          defaultChecked={props.subtask?.done}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="done" className="rw-field-error" />

        <Label
          name="taskId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Task ID
        </Label>


       <NumberField
  name="taskId"
  defaultValue={props.subtask?.taskId || props.taskId}
  className="rw-input"
  errorClassName="rw-input rw-input-error"
  disabled
/>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SubtaskForm
