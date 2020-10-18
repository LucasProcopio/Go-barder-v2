import { Router } from 'express';

import AppointmentRepository from '../repositories/AppointmentRepository';

// Retorna objeto router contendo objeto de functionalidades de rotas do express
const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentRepository.getAll();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const appointmentBooked = appointmentRepository.shouldBookHour(date);

  if (appointmentBooked) {
    return res.status(400).json({
      message: 'An appointment already exists for this date and time.',
    });
  }

  const appointment = appointmentRepository.create(provider, date);
  return res.json(appointment);
});

export default appointmentsRouter;
