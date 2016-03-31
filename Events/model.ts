import * as mongoose from 'mongoose';

export interface IEventModel extends app.i.IEvent, mongoose.Document{}

let eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    numGuests: {type: Number, required: true},
    eventLocation: { type: String, required: true},
    eventAddress: { type: String, required: true},
    dateTime: {type: Number, required: true},
    dateCreated: {type: Number, required: true},
    branchService: {type: String, required: true},
    eventCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ],
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export let Event = mongoose.model<IEventModel>('Event', eventSchema);
