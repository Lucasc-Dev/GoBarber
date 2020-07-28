import { Router } from 'express';

import CreateUserService from '../../modules/users/services/CreateUserService';
import UpdateUserAvatarService from '../../modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name, email, password
    });

    delete user.password;

    return res.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({ user_id: req.user.id, avatarFilename: req.file.filename });

    delete user.password;

    return res.json(user);
});

export default usersRouter;
