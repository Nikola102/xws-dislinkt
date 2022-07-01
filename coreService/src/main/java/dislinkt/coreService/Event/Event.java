package dislinkt.coreService.Event;

import java.util.Date;
import java.util.UUID;

public class Event {
    private UUID eventId = UUID.randomUUID();
    private Date date = new Date();
    
    public UUID getEventId() {
        return eventId;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }

    
}
