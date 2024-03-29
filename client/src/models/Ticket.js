import { TowerEvent } from "./TowerEvent"

export class Ticket {
    constructor(data) {
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.profile = data.profile
        this.towerEvent = data.towerEvent ? new TowerEvent(data.towerEvent) : null 
    }
}



