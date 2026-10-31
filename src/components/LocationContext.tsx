import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LocationContextType {
  city: string | null;
  setCity: (city: string) => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<string | null>(null);

  // Load saved city
  useEffect(() => {
    const savedCity = localStorage.getItem("fixora-city");

    if (savedCity) {
      setCityState(savedCity);
    }
  }, []);

  // Change city
  const setCity = (newCity: string) => {
    console.log("Changing city:", newCity);

    setCityState(newCity);

    localStorage.setItem("fixora-city", newCity);
  };

  return (
    <LocationContext.Provider
      value={{
        city,
        setCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used inside LocationProvider");
  }

  return context;
}
