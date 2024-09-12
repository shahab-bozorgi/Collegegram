/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Mail reset password link.
 *     description: Post username or email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 oneOf:
 *                   - type: string
 *                     format: email
 *                     description: Email of the user
 *                   - type: string
 *                     description: Username of the user
 *                 example: johndoe@example.com
 *             required:
 *               - username
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
