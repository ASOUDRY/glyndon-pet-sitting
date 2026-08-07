export type AvailabilityStatus =
  | "AVAILABLE"
  | "LIMITED"
  | "UNAVAILABLE";

export type ServiceType =
  | "DOG_WALKING"
  | "DROP_IN_VISITS"
  | "IN_HOME_PET_SITTING"
  | "PET_BOARDING"
  | "PET_TAXI";

export type AvailabilityDay = {
  date: string;
  status: AvailabilityStatus;
  services: ServiceType[];
};

export type AvailabilityResponse = {
  month: string;
  days: AvailabilityDay[];
};