import { useEffect, useState } from "react";
import type {
  AvailabilityDay,
  AvailabilityResponse,
  AvailabilityStatus,
} from "../../types/Availability";
import "./AvailabilityCalendar.css";

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function AvailabilityCalendar() {
  const [selectedDay, setSelectedDay] =
    useState<AvailabilityDay | null>(null);

  const [availability, setAvailability] =
    useState<AvailabilityResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [monthOffset, setMonthOffset] = useState(0);

  const today = new Date();

  const displayedDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );

  const year = displayedDate.getFullYear();

  const month = displayedDate.getMonth() + 1;

  const monthName = displayedDate.toLocaleString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  useEffect(() => {
    async function fetchAvailability() {
      try {
        setLoading(true);
        setError(null);
        setSelectedDay(null);

        const response = await fetch(
          `http://localhost:8080/api/availability/getDates?year=${year}&month=${month}`
        );

        if (!response.ok) {
          throw new Error(
            `Backend returned ${response.status}`
          );
        }

        const data: AvailabilityResponse =
          await response.json();

        setAvailability(data);
      } catch (error) {
        console.error(
          "Failed to load availability:",
          error
        );

        setError(
          "Unable to load availability."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
  }, [year, month]);

  const firstDayOfMonth = new Date(
    year,
    month - 1,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month,
    0
  ).getDate();

  const getAvailabilityForDay = (
    dayNumber: number
  ): AvailabilityDay | undefined => {
    if (!availability) {
      return undefined;
    }

    const date = `${year}-${String(month).padStart(
      2,
      "0"
    )}-${String(dayNumber).padStart(2, "0")}`;

    return availability[date];
  };

  const getStatus = (
    day: AvailabilityDay
  ): AvailabilityStatus => {
    if (
      day.dropInsAvailable &&
      day.houseSittingAvailable
    ) {
      return "AVAILABLE";
    }

    if (
      day.dropInsAvailable ||
      day.houseSittingAvailable
    ) {
      return "LIMITED";
    }

    return "UNAVAILABLE";
  };

  const calendarDays = [];

  for (
    let i = 0;
    i < firstDayOfMonth;
    i++
  ) {
    calendarDays.push(
      <div
        key={`empty-${i}`}
        className="calendar-day calendar-day-empty"
      />
    );
  }

  for (
    let dayNumber = 1;
    dayNumber <= daysInMonth;
    dayNumber++
  ) {
    const dayAvailability =
      getAvailabilityForDay(dayNumber);

    const status = dayAvailability
      ? getStatus(dayAvailability)
      : null;

    const statusClass = status
      ? `calendar-day-${status.toLowerCase()}`
      : "calendar-day-unknown";

    calendarDays.push(
      <button
        key={dayNumber}
        className={`calendar-day ${statusClass}`}
        onClick={() => {
          if (dayAvailability) {
            setSelectedDay(dayAvailability);
          }
        }}
        disabled={!dayAvailability}
      >
        <span className="calendar-day-number">
          {dayNumber}
        </span>

        {status && (
          <span className="calendar-status">
            {status === "AVAILABLE" &&
              "Available"}

            {status === "LIMITED" &&
              "Limited"}

            {status === "UNAVAILABLE" &&
              "Unavailable"}
          </span>
        )}
      </button>
    );
  }

  return (
    <section className="availability-section">
      <div className="availability-header">
        <h2>Availability</h2>

        <p>
          Select a date to see which services are
          currently available.
        </p>
      </div>

      <div className="calendar-container">

        <div className="calendar-navigation">
          <button
            onClick={() =>
              setMonthOffset(
                (current) => current - 1
              )
            }
            disabled={monthOffset === 0}
          >
            ← Previous
          </button>

          <h3>{monthName}</h3>

          <button
            onClick={() =>
              setMonthOffset(
                (current) => current + 1
              )
            }
            disabled={monthOffset === 2}
          >
            Next →
          </button>
        </div>

        {loading ? (
          <p>Loading availability...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="calendar-weekdays">
              {weekDays.map((day) => (
                <div key={day}>
                  {day}
                </div>
              ))}
            </div>

            <div className="calendar-grid">
              {calendarDays}
            </div>
          </>
        )}
      </div>

      <div className="calendar-legend">
        <div>
          <span className="legend-dot available" />
          Available
        </div>

        <div>
          <span className="legend-dot limited" />
          Limited
        </div>

        <div>
          <span className="legend-dot unavailable" />
          Unavailable
        </div>
      </div>

      {selectedDay && (
        <div
          className="availability-modal-overlay"
          onClick={() =>
            setSelectedDay(null)
          }
        >
          <div
            className="availability-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="availability-modal-header">

              <h3>
                {new Date(
                  `${selectedDay.date}T12:00:00`
                ).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </h3>

              <button
                className="modal-close-button"
                onClick={() =>
                  setSelectedDay(null)
                }
                aria-label="Close availability details"
              >
                ×
              </button>

            </div>

            <p>Services available:</p>

            <ul className="modal-service-list">

              {selectedDay.dropInsAvailable && (
                <li>
                  ✓ Drop-In Visits
                </li>
              )}

              {selectedDay.houseSittingAvailable && (
                <li>
                  ✓ In-Home Pet Sitting
                </li>
              )}

              {!selectedDay.dropInsAvailable &&
                !selectedDay.houseSittingAvailable && (
                  <li>
                    No services are available on this
                    date.
                  </li>
                )}

            </ul>

            {selectedDay.bookedTimes.length >
              0 && (
              <>
                <p>Unavailable times:</p>

                <ul className="modal-service-list">
                  {selectedDay.bookedTimes.map(
                    (booking, index) => (
                      <li key={index}>
                        {booking.startTime} -{" "}
                        {booking.endTime}
                      </li>
                    )
                  )}
                </ul>
              </>
            )}

          </div>
        </div>
      )}

    </section>
  );
}

export default AvailabilityCalendar;