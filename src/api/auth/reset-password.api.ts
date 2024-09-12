/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset user's password.
 *     description: Post new password and confirm password.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset token sent to the user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *                 example: Pass1234
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation
 *                 example: Pass1234
 *             required:
 *               - password
 *               - confirmPassword
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {}
 *       '403':
 *         description: Forbidden access if token is malformed or not sent
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               message: [
 *                  "Access forbidden"
 *               ]
 *       '400':
 *         description: Bad request, possibly missing or incorrect data
 *       '500':
 *         description: Internal server error
 */
