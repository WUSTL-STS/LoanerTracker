import {
  getModelForClass,
  index,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

@index({ name: "text", email: "text", ticketINC: "text" })
@plugin(mongooseLeanVirtuals)
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
class RecordClass {
  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public email!: string;

  @prop({ type: Number, required: true })
  public loanerID!: number;

  @prop({ type: String, required: true })
  public ticketINC!: string;

  @prop({ type: String, required: true })
  public ticketSysID!: string;

  @prop({ type: Boolean, default: true })
  public isOpen!: boolean;

  @prop({ type: Boolean, default: true })
  public isUnlocked!: boolean;

  @prop({ type: Date, required: true })
  public openDate!: Date;

  @prop({ type: Date, default: null })
  public closeDate?: Date;

  @prop({ type: Date, default: null })
  public nextContactDate?: Date;

  public get serviceNowURL(): string {
    return `https://wustl.service-now.com/incident.do?sys_id=${this.ticketSysID}`;
  }
}

const Record = getModelForClass(RecordClass);

export default Record;
