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
 * /users/followers/{followerId}/delete:
 *   delete:
 *     summary: Delete a user from followers
 *     description: Allows users to remove a user from their followers.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Follow
 *     parameters:
 *       - in: path
 *         name: followerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to remove.
 *     responses:
 *       200:
 *         description: Successfully removed the user from followers.
 *         content:
 *          application/json:
 *            example:
 *              ok: true,
 *              data: {
 *                  "unfollowStatus": true
 *              }
 *       400:
 *         description: Bad request, possibly due to invalid user ID or attempt to unfollow a user who was not followed
 *       401:
 *         description: Unauthorized, user must be authenticated
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
 *                }
 *       500:
 *         description: Internal server error
 */
