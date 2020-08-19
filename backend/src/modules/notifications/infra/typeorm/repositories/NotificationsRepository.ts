import { getRepository, Repository, Raw } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDto from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: Repository<Notification>;

    constructor() {
        this.ormRepository = getRepository(Notification);
    }

    public async create({ content, recipient_id }: ICreateNotificationDto): Promise<Notification> {
        const notification = this.ormRepository.create({ content, recipient_id });

        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
