import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketService {

    async getEventTickets(userId) {
        const eventTickets = await dbContext.Tickets.find({ accountId: userId })
            .populate({
                path: 'event',
                populate: {
                    path: 'ticketCount'
                }
            })
        return eventTickets
    }

    async getTicketsForEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
        return tickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile')
        return ticket
    }

    async returnTicket(ticketId, userId) {
        const ticketToReturn = await dbContext.Tickets.findById(ticketId)

        if (!ticketToReturn) { throw new BadRequest(`invalid id: ${ticketId}`) }

        if (ticketToReturn.accountId != userId) { throw new Forbidden('Not your event') }

        await ticketToReturn.deleteOne()

        return 'Ticket returned '
    }
}




export const ticketService = new TicketService 