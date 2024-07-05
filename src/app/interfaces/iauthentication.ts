export interface IAuthentication {
    addUserInPool(): void;
    login(): void;
    adminAccess(): boolean;
}
