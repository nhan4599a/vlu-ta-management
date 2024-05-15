import { ReactElement, useMemo } from "react";
import { useAppSelector } from "../features/hooks";
import { selectCurrentRole } from "../features/slices/authentication.slice";
import { Role } from "../types/user.type";

type CompoenentRoleMapping = {
  [role in Role]?: ReactElement
};

export const useAdaptiveRoleComponent = (mapping: CompoenentRoleMapping) => {
  const role = useAppSelector(selectCurrentRole);

  const component = useMemo(() => {
    if (!role) {
      return <></>;
    }

    return mapping[role] ?? <></>
  }, [role, mapping]);

  return component;
};
