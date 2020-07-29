import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDto from "../dtos/ICreateAppointmentDTO";

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDto): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}