import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";
import { commentService } from "../services/CommentService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getOneTowerEvent)
            .get('/:eventId/comments', this.getCommentsInEvent)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:eventId', this.updateTowerEvent)
            .post('', this.createTowerEvent)
            .delete('/:eventId', this.archiveEvent)
            // .delete('/:eventId/comments', this.archiveComment)
            .get('/:eventId/tickets', this.getTicketsForEvent)
    }

    // async archiveComment(request, response, next) {
    //     try {
    //         const commentId = request.params.commentId
    //         const userId = request.userInfo.id
    //         const message = await commentService.archiveComment(commentId, userId)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async getCommentsInEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentService.getCommentsInEvent(eventId)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketService.getTicketsForEvent(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)

        }
    }

    async createTowerEvent(request, response, next) {
        try {
            const towerEventData = request.body
            towerEventData.creatorId = request.userInfo.id
            const towerEvent = await towerEventService.createTowerEvent(towerEventData)
            response.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getAllTowerEvents(request, response, next) {
        try {
            const towerEvent = await towerEventService.getAllTowerEvents()
            response.send(towerEvent)
        } catch (error) {
            next(error)

        }
    }

    async getOneTowerEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const towerEvent = await towerEventService.getOneTowerEvent(eventId)
            response.send(towerEvent)
        } catch (error) {
            next(error)

        }
    }

    async updateTowerEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const towerEventData = request.body
            const towerEvent = await towerEventService.updateTowerEvent(eventId, towerEventData)
            response.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async archiveEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const message = await towerEventService.archiveEvent(eventId, userId)
            response.send(message)
        } catch (error) {
            next(error)

        }
    }
}