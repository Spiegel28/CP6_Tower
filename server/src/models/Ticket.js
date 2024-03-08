import { Schema } from "mongoose";
// NOTE reference collaborators from postit

export const TicketSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    })

TicketSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: "_id",
    justOne: true
})
TicketSchema.virtual('towerEvent', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})