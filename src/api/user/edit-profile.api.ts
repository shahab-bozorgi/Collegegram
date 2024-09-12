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
 *
 * /users/profile:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Profile
 *     summary: Edit profile info.
 *     description: Patch edit-profile data. Users can update their personal information and privacy settings.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: john
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: Doe
 *               bio:
 *                 type: string
 *                 description: User's biography
 *                 example: I am John Doe. A fictional character.
 *               isPrivate:
 *                 type: boolean
 *                 description: Specifies privacy setting on user's profile
 *                 example: true
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john_doe@gmail.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: Pass1234
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm password for the user
 *                 example: Pass1234
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {}
 *       '400':
 *         description: Bad request, possibly incorrect data
 *       '401':
 *         description: Not authenticated
 *       '500':
 *         description: Internal server error
 */
