// Responsável pela criação de jobs, que serão utilizados como filas

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

// Cada job deve ter uma key diferente
class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  // Handle é o corpo do job
  async handle({ data }) {
    const { appointment } = data;

    console.log('Fila Executada');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
            locale: pt,
          })
        ),
      },
    });
  }
}

export default new CancellationMail();
