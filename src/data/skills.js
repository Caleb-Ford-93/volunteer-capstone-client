import { fetchWithResponse } from "./fetcher";


export function getSkills() {
    return fetchWithResponse('skills', {
        headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  })
}