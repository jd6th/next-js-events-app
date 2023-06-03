import EventsList from "../components/events/EventsList";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
    return (
        <div>
            <EventsList items={props.events} />
        </div>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}


export default HomePage;