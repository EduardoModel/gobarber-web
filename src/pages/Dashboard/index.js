import React, { useMemo, useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
  setMilliseconds,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import en from 'date-fns/locale/en-US';

import { Container, Time } from './styles';
import api from '~/services/api';

// It would be better to get this type of info from the backend
const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "do 'of' MMMM", { locale: en }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: {
          date,
        },
      });

      const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map((hour) => {
        // Transform the current date into a round hour
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, localTimezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find((a) =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedule(data);
    }
    loadSchedule();
  }, [date]);

  function handlePreviousDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePreviousDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map((appointment) => (
          <Time
            key={appointment.time}
            past={appointment.past}
            available={!appointment.appointment}
          >
            <strong>{appointment.time}</strong>
            <span>
              {appointment.appointment
                ? appointment.appointment.user.name
                : 'Stil available'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
