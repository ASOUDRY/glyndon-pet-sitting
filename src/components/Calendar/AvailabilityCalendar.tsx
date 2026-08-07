import { useState } from "react";
import availabilityData from "../../types/availability.json";
import type {
  AvailabilityDay,
  AvailabilityResponse,
  ServiceType,
} from "../../types/Availability";
import "./AvailabilityCalendar.css";

const availability =
  availabilityData as AvailabilityResponse;

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const serviceLabels: Record<ServiceType, string> = {
  DOG_WALKING: "Dog Walking",
  DROP_IN_VISITS: "Drop-In Visits",
  IN_HOME_PET_SITTING: "In-Home Pet Sitting",
  PET_BOARDING: "Pet Boarding",
  PET_TAXI: "Pet Taxi",
};

function AvailabilityCalendar() {
  const [selectedDay, setSelectedDay] =
    useState<AvailabilityDay | null>(null);

  const [year, month] = availability.month
    .split("-")
    .map(Number);

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

  const monthName = new Date(
    year,
    month - 1
  ).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const getAvailabilityForDay = (
    dayNumber: number
  ) => {
    const date = `${year}-${String(month).padStart(
      2,
      "0"
    )}-${String(dayNumber).padStart(2, "0")}`;

    return availability.days.find(
      (day) => day.date === date
    );
  };

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
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

    const statusClass = dayAvailability
      ? `calendar-day-${dayAvailability.status.toLowerCase()}`
      : "calendar-day-unknown";

    calendarDays.push(
      <button
        key={dayNumber}
        className={`calendar-day ${statusClass}`}
        onClick={() =>
          dayAvailability &&
          setSelectedDay(dayAvailability)
        }
        disabled={!dayAvailability}
      >
        <span className="calendar-day-number">
          {dayNumber}
        </span>

        {dayAvailability && (
          <span className="calendar-status">
            {dayAvailability.status === "AVAILABLE" &&
              "Available"}

            {dayAvailability.status === "LIMITED" &&
              "Limited"}

            {dayAvailability.status ===
              "UNAVAILABLE" && "Unavailable"}
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
        <h3>{monthName}</h3>

        <div className="calendar-weekdays">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays}
        </div>
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
          onClick={() => setSelectedDay(null)}
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
                ).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
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

            {selectedDay.services.length > 0 ? (
              <>
                <p>Services available:</p>

                <ul className="modal-service-list">
                  {selectedDay.services.map(
                    (service) => (
                      <li key={service}>
                        ✓ {serviceLabels[service]}
                      </li>
                    )
                  )}
                </ul>
              </>
            ) : (
              <p>
                No services are available on this
                date.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default AvailabilityCalendar;