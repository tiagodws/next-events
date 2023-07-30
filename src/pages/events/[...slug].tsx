import { useRouter } from 'next/router';
import { EventList, EventSearch } from '../../components/events';
import { Alert, Loading } from '../../components/ui';
import { getFilteredEvents } from '../../data/dummy-data';

const getIsValidSearch = (year: number, month: number) => {
  const isValidYear = !isNaN(year) && year > 2020 && year < 2099;
  const isValidMonth = !isNaN(month) && month > 0 && month < 13;
  return isValidYear && isValidMonth;
};

const EventSearchPage = () => {
  const router = useRouter();
  const searchData = router.query.slug;

  const onSearchHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  const isLoading = !searchData;
  const year = Number(searchData?.[0]);
  const month = Number(searchData?.[1]);
  const isValidSearch = getIsValidSearch(year, month);
  const events = isValidSearch && getFilteredEvents({ year, month });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <div className="flex-none mb-8">
              <EventSearch
                onSearch={onSearchHandler}
                defaultYear={searchData?.[0]}
                defaultMonth={searchData?.[1]}
              />
            </div>

            <div className="flex-1">
              {!isValidSearch && (
                <Alert type="error" message="Invalid search parameters" />
              )}

              {events && <EventList items={events} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventSearchPage;
