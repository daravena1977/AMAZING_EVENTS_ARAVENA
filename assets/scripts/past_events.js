const { events } = data;
const { currentDate } = data;

for (let event of events) {
  if (event.date < currentDate) {
    console.log(event);
  }
}
