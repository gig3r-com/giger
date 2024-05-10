export const noUserIdError = [
  '<span class="error-title">ERROR</span>: Invalid UserId or no UserId provided',
];

export const noUserNameError: string[] = [
  '<span class="error-title">ERROR</span>: Invalid name provided. Try <span class="secondary-color">doc name</span> for more information',
];

export const wrongCommandError: string[] = [
  '<span class="error-title">ERROR</span>: Unrecognized command. Try <span class="secondary-color">list cmd</span> for list of available commands',
];

export const noDocumentationError: string[] = [
  '<span class="error-title">ERROR</span>: Unfortunately there is no documentation you are looking for or you dont have access to it.',
];

export const noProgramKeyError: string[] = [
  '<span class="error-title">ERROR</span>: No program installation key was provided.',
];

export const noProgramError: string[] = [
  '<span class="error-title">ERROR</span>: No program found.',
];

export const programAlreadyAvailableError: string[] = [
  '<span class="error-title">ERROR</span>: You already own that program.',
];

export const programKeyAlreadyUsedError: string[] = [
  '<span class="error-title">ERROR</span>: Program key was already used and is not available.',
];

export const wrongCommandOptionError: string[] = [
  '<span class="error-title">ERROR</span>: wrong command option. Check <span class="secondary-color">doc install</span> for more information.',
];

export const wrongListCommandError: string[] = [
  '<span class="error-title">ERROR</span>: wrong command option. Check <span class="secondary-color">doc list</span> for more information.',
];

export const noScannerError: string[] = [
  '<span class="error-title">ERROR</span>: you dont have scanner.',
];
export const unrecognizedScanError: string[] = [
  '<span class="error-title">ERROR</span>: Scan data is unrecognized.',
];
export const programNotFound: string[] = [
  '<span class="error-title">ERROR</span>: Program not found.',
];
export const notConnectedError: string[] = [
  '<span class="error-title">ERROR</span>: You are not connected to any subnetwork.',
];
export const subnetworkNotFound: string[] = [
  '<span class="error-title">ERROR</span>: Subnetwork not found.',
];
export const evenrNotFound: string[] = [
  '<span class="error-title">ERROR</span>: Record not found.',
];
export const userNotFoundInSubnetworkError: string[] = [
  '<span class="error-title">ERROR</span>: User not found in the subnetwork.',
];
export const noScanId: string[] = [
  '<span class="error-title">ERROR</span>: You need to provide scan id, check <span class="secondary-color">doc scan</span> for more information.',
];

export const cantCopyFromSelf: string[] = [
  '<span class="error-title">ERROR</span>: You cant copy records from your own profile',
];

export const noProfileError: string[] = [
  '<span class="error-title">ERROR</span>: Profile not found',
];

export const noAccountFound: string[] = [
  '<span class="error-title">ERROR</span>: Account not found',
];

export function getErrorMessage(error: any): string[] {
  let errorMsgKey;
  if (typeof error === 'string') {
    errorMsgKey = error;
  }
  if (typeof error?.message === 'string') {
    errorMsgKey = error.message;
  }

  console.error(errorMsgKey);

  const errorKeyMap: { [key: string]: string[] } = {
    'AxiosError: Network Error': [
      '<span class="error-title">ERROR</span>: Network Error',
    ],
    'Request failed with status code 404': [
      '<span class="error-title">ERROR</span>: No data was found',
    ],
    'All promises were rejected': [
      '<span class="error-title">ERROR</span>: No data was found',
    ],
  };

  if (errorKeyMap[errorMsgKey]) {
    return errorKeyMap[errorMsgKey];
  }

  return [errorMsgKey];
}
