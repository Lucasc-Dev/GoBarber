import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeAll(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment.', async () => {
        const appointment = await createAppointment.execute({ 
            provider_id: '1234',
            user_id: 'user-id',
            date: new Date(),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1234');
    });

    it('should not be able to create two appointments at the same time.', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11); 

        await createAppointment.execute({ 
            provider_id: '1234',
            user_id: 'user-id',
            date: appointmentDate,
        });

        await expect(createAppointment.execute({ 
            provider_id: '1234',
            user_id: 'user-id',
            date: appointmentDate,
        })).rejects.toBeInstanceOf(AppError);
    });

    it ('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointment.execute({ 
            provider_id: '1234',
            user_id: 'user-id',
            date: new Date(2020, 4, 10, 11),
        })).rejects.toBeInstanceOf(AppError);
    });
});