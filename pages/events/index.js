import {useRouter} from "next/router";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventsList";
import EventsSerach from "../../components/events/events-search";
import { Fragment } from "react";

function EventsPage(props) {
    const {events} = props;
    const router = useRouter();
    
    function findEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSerach onSearch={findEventHandler} />
            <EventList items={events} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}

export default EventsPage;