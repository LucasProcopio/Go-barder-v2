import Appointment from '../entities/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface ResponseDTO {
  provider: string;
  date: string;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: ResponseDTO): Appointment {
    const appointmentBooked = this.appointmentRepository.shouldBookHour(date);

    if (appointmentBooked) {
      throw Error('An appointment already exists for this date and time.');
    }

    const appointment = this.appointmentRepository.create({ provider, date });
    return appointment;
  }
}

export default CreateAppointmentService;
