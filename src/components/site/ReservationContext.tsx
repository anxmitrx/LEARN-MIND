import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = {
  open: boolean;
  preferredTrack?: string;
  openModal: (track?: string) => void;
  closeModal: () => void;
};

const ReservationCtx = createContext<Ctx | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preferredTrack, setPreferredTrack] = useState<string | undefined>();

  return (
    <ReservationCtx.Provider
      value={{
        open,
        preferredTrack,
        openModal: (t) => {
          setPreferredTrack(t);
          setOpen(true);
        },
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </ReservationCtx.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationCtx);
  if (!ctx) throw new Error("useReservation must be inside ReservationProvider");
  return ctx;
}
