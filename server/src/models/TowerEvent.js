import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  description: { type: String, required: true, minlength: 15, maxlength: 1000 },
  coverImg: { type: String, required: true, minlength: 1, maxlength: 1000 },
  location: { type: String, required: true, minlength: 1, maxlength: 500 },
  capacity: { type: Number, required: true, minlength: 1, maxlength: 5000 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital', 'misc'], required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  count: true
})

