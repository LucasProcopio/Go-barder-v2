import { Router } from 'express';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// Retorna objeto router contendo objeto de functionalidades de rotas do express
const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentRepository.getAll();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const createAppointmentService = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointmentService.execute({ provider, date });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;
