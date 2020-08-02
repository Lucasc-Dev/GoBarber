import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment.', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({ 
            provider_id: '1234',
            date: new Date(),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1234');
    });

    it('should not be able to create two appointments at the same time.', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11); 

        await createAppointment.execute({ 
            provider_id: '1234',
            date: appointmentDate,
        });

        expect(createAppointment.execute({ 
            provider_id: '1234',
            date: appointmentDate,
        })).rejects.toBeInstanceOf(AppError);
    });
});