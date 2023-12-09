import User from "./User";
import Event from "./Event";

type Booking = {
    _id: string;
    event_id: string;
    user_id: string;
    event: Event;
    user: User;
    no_of_tickets: number;
    payment_id: string;
    payment_status: string;
    payment_amount: number;
    created_at: string;
    updated_at: string;
}

export default Booking;