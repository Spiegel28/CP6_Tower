import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketService {
async getTicketsByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got tickets', response.data)
}
}

export const ticketService = new TicketService()