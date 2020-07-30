import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticated);

/* appoitmentsRouter.get('/', async (req, res) => {
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
}); */

appoitmentsRouter.post('/', async (req, res) => {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return res.json(appointment);
});

export default appoitmentsRouter;
