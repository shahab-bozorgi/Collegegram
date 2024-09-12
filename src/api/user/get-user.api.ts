/**
 * @swagger
 * /users/{username}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by Username.
 *     description: Get user by Username.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {}
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
