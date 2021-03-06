import { virtuals } from '.'
import { Document } from 'mongoose'

interface StringSchemaArgs {
  minlength?: number
  maxlength?: number
  required?: boolean
  unique?: boolean
}

interface StringSchema {
  type: any
  minlength: any[]
  maxlength: any[]
  match: any[]
  required: boolean,
  unique: boolean
}

/**
 *  String Schema Mongoose
 *
 * @export
 * @param {StringSchemaArgs} { minlength, maxlength, required } the string schema args
 * @returns {StringSchema}
 */
export function stringSchema ({ minlength, maxlength, required = false, unique = false }: StringSchemaArgs): StringSchema {
  return {
    type: String,
    minlength: [minlength || 2, `at least ${minlength || 2} characters`],
    maxlength: [maxlength || 50, `at most ${maxlength || 50} characters`],
    match: [/^[a-zA-Z0-9-\$]+$/, 'can only have numbers, letters and $'],
    required,
    unique
  }
}

function transform (doc: Document | any, ret: any, options: any) {
  ret.created_at = Date.parse(ret.created_at)
  ret.updated_at = Date.parse(ret.updated_at)
  delete ret.authorId
  delete ret._id
  return ret
}

export const modelOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  id: true,
  toJSON: { ...virtuals, transform },
  toObject: virtuals
}
