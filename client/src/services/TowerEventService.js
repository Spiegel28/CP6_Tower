import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService"

class TowerEventService {
    
async getAllTowerEvents() {
    const response = await api.get('api/events') 
    // NOTE make sure api is correct 
    logger.log('got all events', response.data)
    AppState.towerEvents = response.data.map(towerEvent => new TowerEvent(towerEvent))
}

async getEventById(eventId) {
    AppState.activeEvent = null 
    const response = await api.get(`api/events/${eventId}`)
    logger.log('got event', response.data)
    AppState.activeEvent = new TowerEvent(response.data)
}

async createTowerEvent(towerEventData) {
    const response = await api.post('api/events', towerEventData)
    logger.log('created event', response.data)
    const newEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(newEvent)
    return newEvent
}

async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log('canceled event', response.data)
}
}


export const towerEventService = new TowerEventService()