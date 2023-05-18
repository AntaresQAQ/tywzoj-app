import { CE_ProblemScope, IProblemEntityWithExtra } from "@/Common/ServerType/Problem";
import { useCurrentUser } from "@/Features/Environment/Hooks";
import { CE_Permission } from "@/Features/Permission/Enums/Permission";

import { usePermission } from "./Permission";

export const useAllowedManageProblem = (problem: IProblemEntityWithExtra): boolean => {
  const allowedManageProblem = usePermission(CE_Permission.ManageProblem);
  const currentUser = useCurrentUser();

  if (allowedManageProblem) {
    return true;
  }

  if (problem.scope === CE_ProblemScope.Personal) {
    return !!currentUser && currentUser.id === problem.owner.id;
  } else if (problem.scope === CE_ProblemScope.Global) {
    return false;
  } else {
    // Group problem should not be checked here.
    return false;
  }
};

export const useAllowedCreateProblem = (scope: CE_ProblemScope): boolean => {
  const allowedManageProblem = usePermission(CE_Permission.ManageProblem);
  const allowedCreatePersonalProblem = usePermission(CE_Permission.CreatePersonalProblem);

  if (scope === CE_ProblemScope.Global) {
    return allowedManageProblem;
  } else if (scope === CE_ProblemScope.Personal) {
    return allowedCreatePersonalProblem;
  } else {
    return false;
  }
};
