export type AvailabilityStatus =
  | "AVAILABLE"
  | "LIMITED"
  | "UNAVAILABLE";

export type BookedServiceType =
  | "DROP_IN"
  | "PERSONAL";

export type BookedTimeSlot = {
  startTime: string;
  endTime: string;
  serviceType: BookedServiceType;
};

export type AvailabilityDay = {
  date: string;
  bookedTimes: BookedTimeSlot[];
  dropInsAvailable: boolean;
  houseSittingAvailable: boolean;
};

export type AvailabilityResponse = Record<
  string,
  AvailabilityDay
>;