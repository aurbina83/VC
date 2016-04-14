import * as mongoose from 'mongoose';

export interface IEventModel extends app.i.IEvent, mongoose.Document{}

let eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    name:{type: String, required: true},
    description: {type: String, required: true},
    numGuests: {type: Number, required: true},
    loc: { type: [Number], index: '2dsphere', required: true},
    eventAddress: { type: String, required: true},
    dateTime: {type: String, required: true},
    dateCreated: {type: Number},
    eventCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    attending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
});

export let Event = mongoose.model<IEventModel>('Event', eventSchema);
