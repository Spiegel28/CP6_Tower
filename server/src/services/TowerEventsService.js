import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TowerEventsService {
    async createTowerEvent(towerEventData) {
        const towerEvent = await dbContext.TowerEvent.create(towerEventData)
        await towerEvent.populate('creator')
        return towerEvent
    }

    async getAllTowerEvents() {
        const towerEvent = await dbContext.TowerEvent.find().populate('creator')
        return towerEvent
    }

    async getOneTowerEvent(eventId) {
        const towerEvent = (await dbContext.TowerEvent.findById(eventId)).populate('creator')
        if (!towerEvent) throw new Error('no event with id: ${eventId}')
        return towerEvent
    }

    async updateTowerEvent(eventId, towerEventData) {
        const eventEdit = await this.getOneTowerEvent(eventId)

        eventEdit.description = towerEventData.description || eventEdit.description

        eventEdit.name = towerEventData.name || eventEdit.name


        await eventEdit.save()

        return eventEdit

    }

    async archiveEvent(eventId, userId) {
        const towerEvent = await this.getOneTowerEvent(eventId)
        if (towerEvent.creatorId != userId) throw new Forbidden('cant do that')
        towerEvent.isCanceled = true
        await towerEvent.save()
        return `archived the ${towerEvent.name} event`
    }
}

export const towerEventService = new TowerEventsService()