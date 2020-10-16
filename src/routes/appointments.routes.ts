import { Router } from 'express';
import { v4 } from 'uuid';
import { parseISO, isEqual, startOfHour } from 'date-fns';

import Appointment from '../entities/Appointment';

// Retorna objeto router contendo objeto de functionalidades de rotas do express
const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));

  const appointment = {
    id: v4(),
    provider,
    date: parsedDate,
  };

  const hourNotAvailable = appointments.find(element =>
    isEqual(element.date, parsedDate),
  );

  if (hourNotAvailable) {
    return res.status(400).json({
      message: 'An appointment already exists for this date and time.',
    });
  }

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
