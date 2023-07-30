import { FC, FormEvent, useRef } from 'react';

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

  console.log(defaultYear, defaultMonth);

  return (
    <form className="join" onSubmit={submitHandler}>
      <select
        id="year"
        ref={yearInputRef}
        className="select select-bordered join-item"
        defaultValue={defaultYear}
      >
        <option disabled hidden value="">
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
        className="select select-bordered join-item"
        defaultValue={defaultMonth}
      >
        <option disabled hidden value="">
          Month
        </option>

        {months.map((month, i) => (
          <option key={i + 1} value={i + 1}>
            {month}
          </option>
        ))}
      </select>

      <div className="indicator">
        <button type="submit" className="btn join-item">
          Search
        </button>
      </div>
    </form>
  );
};
