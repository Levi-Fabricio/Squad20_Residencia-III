import { useCallback, useEffect, useState } from "react";
import { maintenanceService, vehicleService } from "../services/maintenanceService";
import type { Maintenance } from "../types/maintenance";

/** Reads maintenances on the client and re-syncs whenever the store changes. */
export function useMaintenances() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setMaintenances(maintenanceService.list());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(maintenanceService.CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(maintenanceService.CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return { maintenances, vehicles: vehicleService.list(), loading, refresh };
}
