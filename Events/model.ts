import * as mongoose from 'mongoose';

export interface IEventModel extends app.i.IEvent, mongoose.Document{}

let eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    name:{type: String, required: true},
    description: {type: String, required: true},
    numGuests: {type: String, required: true},
    loc: { type: [Number], index: '2d', required: true},
    eventAddress: { type: Array, required: true},
    dateTime: {type: String, required: true},
    dateCreated: {type: Number},
    eventCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export let Event = mongoose.model<IEventModel>('Event', eventSchema);
