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
 * /users/{userId}/unblock:
 *   delete:
 *     summary: Unblock a user.
 *     description: Allows users to unblock blocked users.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Blocking
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to unblock.
 *     responses:
 *       200:
 *         description: Successfully unblocked the user
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
 *                      "userId": "invalid | required",
 *                }
 *       500:
 *         description: Internal server error
 */
