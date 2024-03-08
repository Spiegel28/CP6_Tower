export class TowerEvent {
    constructor(data){
        this.id = data.id || data._id
        this.name = data.name 
        this.description = data.description 
        this.coverImg = data.coverImg 
        this.location = data.location 
        this.capacity = data.capacity 
        this.startDate = new Date(data.startDate )
        this.isCanceled = data.isCanceled 
        this.creator = data.creator
        this.type = data.type

    }
}
