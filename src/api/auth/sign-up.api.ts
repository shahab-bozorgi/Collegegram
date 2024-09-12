/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign-up user.
 *     description: Post sign-up data.
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
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: P@ssw0rd
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm password for the user
 *                 example: P@ssw0rd
 *             required:
 *               - username
 *               - email
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
 *       '400':
 *         description: Bad request, possibly missing or incorrect data
 *       '500':
 *         description: Internal server error
 */
