import { fetchWithResponse } from "./fetcher"

export function login(user) {
  return fetchWithResponse('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}

export function register(user) {
  return fetchWithResponse('register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}

export function getUserProfile() {
  return fetchWithResponse('profile', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  })
}
export function updateUserProfile(editInfo, id) {
  return fetchWithResponse(`profile/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editInfo)
  })
}
