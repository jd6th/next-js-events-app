import EventItem from "./EventItem";
import classes from './EventList.module.css';

function EventsList(props) {
    const { items } = props;

    return <ul className={classes.list}>
        { items.map((event) => (
            <EventItem 
                key={event.id}
                id={event.id} 
                title={event.title} 
                image={event.image} 
                date={event.date} 
                location={event.location} 
            />
        ))}
    </ul>
}

export default EventsList;