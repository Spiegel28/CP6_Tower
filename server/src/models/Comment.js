// TODO reference pictures from PostIt

import { Schema } from "mongoose";

export const CommentSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        body: { type: String, required: true, minlength: 1, maxlength: 500 },


    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})