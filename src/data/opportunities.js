import { fetchWithResponse } from "./fetcher";

export function getOrganizationOpportunities() {
    return fetchWithResponse('profile/organization', {
        headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  })
}