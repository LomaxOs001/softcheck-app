import { IAuthentication } from "../interfaces/iauthentication";

export class BuyerAuthn implements IAuthentication {
    
        addUserInPool(): void {
            throw new Error("Method not implemented.");
        }
    
        login(): void {
            throw new Error("Method not implemented.");
        }
    
        adminAccess(): boolean {
            throw new Error("Method not implemented.");
        }
}
