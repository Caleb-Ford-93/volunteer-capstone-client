import { fetchWithoutResponse, fetchWithResponse } from "./fetcher";

export function getOrganizationOpportunities() {
    return fetchWithResponse('profile/organization', {
        headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  })
}
export function getOpportunityById(id) {
  return fetchWithResponse(`opportunities/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function createNewOpportunity(opportunity){
  return fetchWithoutResponse('opportunities',{
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(opportunity)
  })
}

export function updateOpportunity(id, opportunity){
  return fetchWithoutResponse(`opportunities/${id}`,{
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(opportunity)
  })
}

export function deleteOpportunity(id){
  return fetchWithoutResponse(`opportunities/${id}`,{
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getAllOpportunities(){
  return fetchWithResponse("opportunities", {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  })
}

export function signUpVolunteer(id) {
  return fetchWithoutResponse("profile/volunteer", {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"opportunityId": id})
  })
}

export function getSignedUpOpportunities() {
  return fetchWithResponse("profile/volunteer", {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function removeVolunteerFromOpportunity(id) {
  return fetchWithoutResponse("profile/volunteer", {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"opportunityId": id})
  })
}