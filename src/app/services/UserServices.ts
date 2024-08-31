import { Injectable } from '@angular/core';
import { fetchAuthSession} from 'aws-amplify/auth';

@Injectable({
    providedIn: 'root',
})

class UserServices {
  //Return Amazon Cognito group belonging to current authenticated user
    async getGroups(): Promise<string[]> {
        try {
          const session = await fetchAuthSession();
          const groups = session.tokens?.accessToken?.payload["cognito:groups"] as string[];
          return groups || [];
        } catch (error) {
          console.error("Error fetching groups: ", error);
          return [];
        }
      }
}
export {UserServices}
