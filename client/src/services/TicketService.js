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

async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log('created ticket', response.data)
    AppState.eventTickets.push(new Ticket(response.data))
}

async getMyTickets() {
    const response = await api.get('account/tickets')
    logger.log('got my tickets', response.data)
    const newTicket = response.data.map(pojo => new Ticket(pojo))
    AppState.eventTickets = newTicket
}
async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log('deleted ticket', response.data)
    const ticketIndex = AppState.eventTickets.findIndex(ticket => ticket.id == ticketId)
    if (ticketIndex == -1) throw new Error("WRONG")

    AppState.eventTickets.splice(ticketIndex, 1)
}
}

export const ticketService = new TicketService()