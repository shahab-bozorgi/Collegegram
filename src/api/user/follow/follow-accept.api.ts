/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 * security:
 *  - bearerAuth: []
 * /users/follow/{followerId}/request/accept:
 *  patch:
 *    summary: Accept follow request
 *    description: Allows a user to accept follow request from another user by their ID.
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Follow
 *    parameters:
 *      - in: path
 *        name: followerId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to accept follow request.
 *    responses:
 *      200:
 *        description: Successfully update follow request of user
 *        content:
 *           application/json:
 *             example:
 *              ok: true,
 *              data: {
 *                 "followerId": "2cfcc034-1d5f-444d-b194-f99fb1551629",
 *                 "followingId": "d9ae9bd5-abf8-4dc6-ade2-9b23f71615ff",
 *                 "requestStatus": "accepted"
 *              }
 *      400:
 *        description: Bad request, possibly incorrect data
 *      401:
 *        description: Not authenticated
 *      404:
 *        description: Follwer user not found | Follwing user not found
 *      422:
 *       description: Field has an invalid or required value
 *       content:
 *           application/json:
 *             example:
 *               ok: false
 *               message: Check validation key of this object!
 *               validation: 
 *                 followerId: invalid | required
 *      500:
 *        description: Internal server error
 */