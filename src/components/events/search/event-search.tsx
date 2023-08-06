import { FC, FormEvent, useRef } from 'react';
import { Button } from '../../ui';

const years = ['2023', '2022', '2021'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type EventSearchProps = {
  defaultYear?: string;
  defaultMonth?: string;
  onSearch: (year: string, month: string) => void;
};

export const EventSearch: FC<EventSearchProps> = (props) => {
  const { onSearch, defaultYear = '', defaultMonth = '' } = props;
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    if (!selectedYear || !selectedMonth) return;

    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className="join flex" onSubmit={submitHandler}>
      <select
        id="year"
        ref={yearInputRef}
        className="select select-bordered join-item flex-1 min-w-0"
        defaultValue={defaultYear}
      >
        <option disabled value="">
          Year
        </option>

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        id="month"
        ref={monthInputRef}
        className="select select-bordered join-item flex-1 min-w-0"
        defaultValue={defaultMonth}
      >
        <option disabled value="">
          Month
        </option>

        {months.map((month, i) => (
          <option key={i + 1} value={i + 1}>
            {month}
          </option>
        ))}
      </select>

      <Button text="Search" className="join-item flex-0" type="submit" />
    </form>
  );
};
