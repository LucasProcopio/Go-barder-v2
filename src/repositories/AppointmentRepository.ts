import { isEqual, parseISO, startOfHour } from 'date-fns';
import Appointment from '../entities/Appointment';

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public getAll(): Appointment[] {
    return this.appointments;
  }

  public create(provider: string, date: string): Appointment {
    const parsedDate = AppointmentRepository.parseAppointmentDate(date);
    const appointment = new Appointment(provider, parsedDate);

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
