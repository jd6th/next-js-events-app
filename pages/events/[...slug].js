import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventsList from "../../components/events/EventsList";
import ResultsTitle from "../../components/events/results-title";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/events/ui/Button";
import ErrorAlert from "../../components/events/ui/error-alert";
import useSWR from 'swr';

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filterData = router.query.slug;

    const {data, error} = useSWR('https://events-app-1c2fb-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');

    useEffect(() => {
        if(data) {
            const events = [];

            for(const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }

            setLoadedEvents(events);
        }
    }, [data])


    if(!loadedEvents) {
        return (
            <Fragment>
                <ErrorAlert><p>No data found</p></ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(
        isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2030 || 
        numYear < 2021 || 
        numMonth < 1 || 
        numMonth >12 || 
        error
    ){
        return (
            <Fragment>
                <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });    

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert><p>No events found!</p></ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        ) 
    }

    const date = new Date(numYear, numMonth-1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventsList items={filteredEvents} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const {params} = context;
//     const filterData = params.slug;
//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if(
//         isNaN(numYear) || 
//         isNaN(numMonth) || 
//         numYear > 2030 || 
//         numYear < 2021 || 
//         numMonth < 1 || 
//         numMonth >12
//     ){
//         return {
//             props: {hasError: true}
//             // notFound: true
//             // redirect: {
//             //     destination: '/path-to-error-page'
//             // }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({year: numYear, month: numMonth});

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventsPage;