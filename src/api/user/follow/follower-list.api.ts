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
 * /users/{userId}/followers?page=1&limit=2:
 *   get:
 *     summary: Get a list of users following the specified user
 *     description: Retrieves the list of users who are following the specified user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Follow
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose followers are to be retrieved.
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         required: true
 *         description: page number.
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         required: true
 *         description: page size.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of followers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     followers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: User ID of the follower
 *                           avatar:
 *                             type: string
 *                             nullable: true
 *                             description: URL of the follower's avatar
 *                           username:
 *                             type: string
 *                             description: Username of the follower
 *                           firstName:
 *                             type: string
 *                             description: First name of the follower
 *                           lastName:
 *                             type: string
 *                             description: Last name of the follower
 *                           bio:
 *                             type: string
 *                             nullable: true
 *                             description: Bio of the follower
 *                           followersCount:
 *                             type: integer
 *                             description: Number of followers the follower has
 *       400:
 *         description: Bad request, possibly due to invalid user ID
 *       401:
 *         description: Unauthorized, user must be authenticated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
