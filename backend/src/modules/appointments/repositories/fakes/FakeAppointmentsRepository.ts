import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const appointment = this.appointments.find(appointment => isEqual(appointment.date, date));

        return appointment;
    }

    public async create({ provider_id, date }: ICreateAppointmentDto): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
