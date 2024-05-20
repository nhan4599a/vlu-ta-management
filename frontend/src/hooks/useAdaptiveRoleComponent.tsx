import { ReactElement, useMemo } from "react";
import { useAppSelector } from "@redux/hooks";
import { selectCurrentRole } from "@redux/slices/authentication.slice";
import { Role } from "@main/types/user.type";

type CompoenentRoleMapping = {
  [role in Role]?: ReactElement
};

export const useAdaptiveRoleComponent = (mapping: CompoenentRoleMapping) => {
  const role = useAppSelector(selectCurrentRole);

  const component = useMemo(() => {
    if (role === undefined) {
      return <></>;
    }

    return mapping[role] ?? <></>
  }, [role, mapping]);

  return component;
};
