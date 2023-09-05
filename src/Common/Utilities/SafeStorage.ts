/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
let _localStorage: Storage;
let _sessionStorage: Storage;
let _noStorage: Storage;

let _localStorageSupported: boolean;
let _sessionStorageSupported: boolean;

export function getLocalStorage(): Storage {
    if (!_localStorage) {
        if (supportsLocalStorage()) {
            _localStorage = window.localStorage;
        } else {
            _localStorage = getNoStorage();
        }
    }

    return _localStorage;
}

export function getSessionStorage(): Storage {
    if (!_sessionStorage) {
        if (supportsSessionStorage()) {
            _sessionStorage = window.sessionStorage;
        } else {
            _sessionStorage = getNoStorage();
        }
    }

    return _sessionStorage;
}

export function getNoStorage(): Storage {
    if (!_noStorage) {
        _noStorage = new NoStorage();
    }

    return _noStorage;
}

export function supportsLocalStorage(): boolean {
    if (_localStorageSupported === undefined) {
        try {
            const storageTestKey = "__storage_test__";
            window.localStorage.setItem(storageTestKey, storageTestKey);
            window.localStorage.removeItem(storageTestKey);

            _localStorageSupported = true;
        } catch (e) {
            _localStorageSupported = false;
        }
    }

    return _localStorageSupported;
}

export function supportsSessionStorage(): boolean {
    if (_sessionStorageSupported === undefined) {
        try {
            const storageTestKey = "__storage_test__";
            window.sessionStorage.setItem(storageTestKey, storageTestKey);
            window.sessionStorage.removeItem(storageTestKey);

            _sessionStorageSupported = true;
        } catch (e) {
            _sessionStorageSupported = false;
        }
    }

    return _sessionStorageSupported;
}

class NoStorage implements Storage {
    public length: number = 0;
    public clear(): void {}
    public getItem(key: string): any {}

    public key(index: number): string {
        return null;
    }
    public removeItem(key: string): void {}
    public setItem(key: string, data: string): void {}
    [key: string]: any;
    [index: number]: string;
}
