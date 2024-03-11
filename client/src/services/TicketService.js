import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketService {
async getTicketsByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got tickets', response.data)
    const newTickets = response.data.map(pojo => new Ticket(pojo))
    AppState.eventTickets = newTickets
}

async deleteTicket(ticketId) {
    const response = await api.delete(`api/ticket/${ticketId}`)
    logger.log('deleted ticket', response.data)
    const ticketIndex = AppState.eventTickets.findIndex(ticket => ticket.id == ticketId)
    if (ticketIndex == -1) throw new Error("WRONG")

    AppState.eventTickets.splice(ticketIndex, 1)
}
}

export const ticketService = new TicketService()