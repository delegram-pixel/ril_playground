// Simple in-memory store for demo purposes
// In production, this would be replaced with actual database operations

let impressions = []
let briefingRequests = []

export const addImpression = (impression) => {
  const newImpression = {
    id: Date.now().toString(),
    ...impression,
    createdAt: new Date().toISOString(),
  }
  impressions.push(newImpression)
  return newImpression
}

export const getImpressionsByProduct = (productId) => {
  return impressions.filter((imp) => imp.productId === productId)
}

export const addBriefingRequest = (request) => {
  const newRequest = {
    id: Date.now().toString(),
    ...request,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  briefingRequests.push(newRequest)
  return newRequest
}

export const getBriefingRequests = () => {
  return briefingRequests
}
