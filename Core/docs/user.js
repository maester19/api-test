/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage users
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/AdminAcceptUser /{id}:
 *   put:
 *     summary: Admin accepts a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to accept
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User accepted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/AdminRejectUser /{id}:
 *   put:
 *     summary: Admin rejects a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to reject
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User rejected successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/AdminBlockUser /{id}:
 *   put:
 *     summary: Admin blocks a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to block
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User blocked successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/AdminGetAllUser :
 *   get:
 *     summary: Get all users (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 */

/**
 * @swagger
 * /users/AdminGetUser ByRole/{role}:
 *   get:
 *     summary: Get users by role (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: role
 *         in: path
 *         required: true
 *         description: Role of the users to retrieve
 *         schema:
 *           type: string
 *     responses:
 *         200:
 *         description: List of all users retrieved successfully
 */