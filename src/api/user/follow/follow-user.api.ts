/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 * /users/follow/{followingId}:
 *   post:
 *     summary: Follow a user
 *     description: Allows a user to follow another user by their ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Follow
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to follow.
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *         content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: {
 *                  "followerId": "2cfcc034-1d5f-444d-b194-f99fb1551629",
 *                  "followingId": "d9ae9bd5-abf8-4dc6-ade2-9b23f71615ff",
 *                  "requestStatus": "accepted | pending"
 *              }
 *       400:
 *         description: Bad request, possibly incorrect data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Follower user not found | Following user not found
 *       422:
 *           description: Field has an invalid or required value
 *           content:
 *            application/json:
 *               example:
 *                ok: true
 *                message: "Check validation key of this object!"
 *                validation: { 
 *                      "followerId": "invalid | required",
 *                      "followingId": "invalid | required",
 *                }        
 *       500:
 *         description: Internal server error
 */
