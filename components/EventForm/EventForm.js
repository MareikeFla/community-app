export default function EventForm() {
  const handleChange = () => {};

  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="evenName"
          value=""
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="selector">Kategorie</label>
        <input
          type="select"
          id="selector"
          name="selector"
          value=""
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="startDate">Beginn</label>
        <input
          id="startDate"
          name="startDate"
          value=""
          onChange={handleChange}
        />
        <label htmlFor="startTime">Beginn</label>
        <input
          id="startTime"
          name="startTime"
          value=""
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">Ende</label>
        <input id="endDate" name="endDate" value="" onChange={handleChange} />
        <label htmlFor="endTime">Ende</label>
        <input id="endTime" name="endTime" value="" onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
