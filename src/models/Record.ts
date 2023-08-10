import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose'

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
}

const Record = getModelForClass(RecordClass)

export default Record;
