import { isEqual, parseISO, startOfHour } from 'date-fns';
import Appointment from '../entities/Appointment';

// DTO (data transfer object pattern)
interface createAppointmentDTO {
  provider: string;
  date: string;
}
class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public getAll(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: createAppointmentDTO): Appointment {
    const parsedDate = AppointmentRepository.parseAppointmentDate(date);
    const appointment = new Appointment({ provider, date: parsedDate });

    this.appointments.push(appointment);

    return appointment;
  }

  public shouldBookHour(date: string): Appointment | null {
    const parsedDate = AppointmentRepository.parseAppointmentDate(date);
    const appointment = this.appointments.find(element =>
      isEqual(element.date, parsedDate),
    );

    return appointment || null;
  }

  public static parseAppointmentDate(date: string): Date {
    return startOfHour(parseISO(date));
  }
}

export default AppointmentRepository;
