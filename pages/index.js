import Head from "next/head";
import EventsList from "../components/events/EventsList";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve!" />
            </Head>
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