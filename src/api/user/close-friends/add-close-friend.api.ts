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
 * /users/close-friends/{followerId}/add:
 *   patch:
 *     summary: Add a user to close friends.
 *     description: Allows users to add other users to their close friends.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Close friends
 *     parameters:
 *       - in: path
 *         name: followerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be added to close friends.
 *     responses:
 *       200:
 *         description: Successfully added user
 *         content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: {}
 *       400:
 *         description: Bad request, possibly incorrect data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Post not found
 *       422:
 *           description: Field has an invalid or required value
 *           content:
 *            application/json:
 *               example:
 *                ok: true
 *                message: "Check validation key of this object!"
 *                validation: {
 *                      "followerId": "invalid | required",
 *                }
 *       500:
 *         description: Internal server error
 */
