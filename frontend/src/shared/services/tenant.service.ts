import { configs } from "../../tenant/tenant.config";
import { useTenant } from "../providers/tenant.provider";

export function useTenantConfig() {
  const id = useTenant();
  return configs[id];
}
