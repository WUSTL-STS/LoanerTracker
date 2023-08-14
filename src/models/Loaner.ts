import { getModelForClass, prop, plugin } from '@typegoose/typegoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { OS } from './OS'

@plugin(mongooseLeanVirtuals)
class LoanerClass {
  @prop({ type: Number, required: true })
  public id!: Number

  @prop({ type: Boolean, required: true })
  public isLoaned!: boolean

  @prop({ type: String, enum: OS, required: true })
  public OS!: OS

  public get name (): string {
    return `${this.id} - ${this.OS}`
  }
}

const Loaner = getModelForClass(LoanerClass)

export default Loaner
