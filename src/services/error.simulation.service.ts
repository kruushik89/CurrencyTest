const defaultRequestNumber = 0;
const keyName = 'countOfReq';

const getRequestNumber = (): number => Number(localStorage.getItem(keyName));
const increaseRequestNumber = (): void => localStorage.setItem(keyName, String(getRequestNumber() + 1));
const resetRequestNumber = (): void => localStorage.setItem(keyName, String(defaultRequestNumber));
const isFifthRequest = (): boolean => getRequestNumber() === 5;

localStorage.setItem(keyName, String(getRequestNumber() || defaultRequestNumber));

export const throwError = (): void => {
  increaseRequestNumber();

  if (isFifthRequest()) {
    resetRequestNumber();

    throw new Error('Internal Server Error');
  }
}