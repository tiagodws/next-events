import type { FC, FormEvent } from 'react';
import { useEffect, useRef } from 'react';
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
  const { defaultYear = '', defaultMonth = '', onSearch } = props;
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    if (!selectedYear || !selectedMonth) return;

    onSearch(selectedYear, selectedMonth);
  };

  useEffect(() => {
    if (!yearInputRef.current || !monthInputRef.current) {
      return;
    }

    yearInputRef.current.value = defaultYear;
    monthInputRef.current.value = defaultMonth;
  }, [defaultYear, defaultMonth]);

  return (
    <form className="flex" onSubmit={submitHandler}>
      <select
        id="year"
        ref={yearInputRef}
        className="select select-bordered flex-1 min-w-0"
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
        className="select select-bordered flex-1 min-w-0 ml-2"
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

      <Button className="ml-2 flex-0" type="submit">
        Search
      </Button>
    </form>
  );
};
