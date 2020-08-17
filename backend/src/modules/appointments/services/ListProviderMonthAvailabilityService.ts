import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request{
    provider_id: string;
    month: number;
    year: number;
}

type Response = Array<{
    day: number;
    available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ provider_id, month, year }: Request): Promise<Response> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id: provider_id,
            year,
            month,
        });

        console.log(appointments)

        return [
            {day: 1, available: false}
        ];
    }
}

export default ListProviderMonthAvailabilityService;
