/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user.
 *     description: Post login data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: P@ssw0rd
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {}
 *       '400':
 *         description: Bad request, possibly missing or incorrect data
 *       '500':
 *         description: Internal server error
 */
