// API Service for centralized API calls
if (!AxisHub.Api) {
    // Define a configurable API base URL
    // Use the same origin as the current page to avoid CORS issues
    const currentOrigin = window.location.hostname;
    AxisHub.apiBaseUrl = currentOrigin === '127.0.0.1' ? 
        'http://127.0.0.1:8000' : 'http://localhost:8000';
    
    AxisHub.Api = class {
        async get(endpoint) {
            try {
                const headers = {
                    'Content-Type': 'application/json'
                };
                
                const response = await fetch(`${AxisHub.apiBaseUrl}${endpoint}`, {
                    headers: headers
                });
                
                if (response.status === 401) {
                    console.error("Authentication failed (401 Unauthorized)");
                }
                
                // Handle 403 Forbidden errors gracefully
                if (response.status === 403) {
                    console.warn(`Permission denied for endpoint: ${endpoint}`);
                    // Return an empty result instead of throwing an error
                    return { error: 'insufficient_permissions', data: [] };
                }
                
                // Log detailed information about failed requests
                if (!response.ok) {
                    console.error(`API request failed: ${endpoint}`, {
                        status: response.status,
                        statusText: response.statusText
                    });
                    
                    // Try to get error details from response
                    let errorDetails = '';
                    try {
                        const errorData = await response.json();
                        errorDetails = errorData.error || errorData.message || '';
                    } catch (e) {
                        // Ignore JSON parsing errors
                    }
                    
                    throw new Error(`HTTP error! status: ${response.status}${errorDetails ? ` - ${errorDetails}` : ''}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error(`Error in API.get(${endpoint}):`, error);
                throw error;
            }
        }

        async post(endpoint, data) {
            try {
                const headers = {
                    'Content-Type': 'application/json'
                };
                
                const response = await fetch(`${AxisHub.apiBaseUrl}${endpoint}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                });
                
                if (response.status === 401) {
                    console.error("Authentication failed (401 Unauthorized)")
                }

                // Handle 403 Forbidden errors gracefully
                if (response.status === 403) {
                    console.warn(`Permission denied for endpoint: ${endpoint}`);
                    // Return an empty result instead of throwing an error
                    return { error: 'insufficient_permissions', data: [] };
                }
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error(`Error in API.post(${endpoint}):`, error);
                throw error;
            }
        }
    
        async put(endpoint, data) {
            try {
                const headers = {
                    'Content-Type': 'application/json'
                };
                
                const response = await fetch(`${AxisHub.apiBaseUrl}${endpoint}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(data)
                });

                // Handle 403 Forbidden errors gracefully
                if (response.status === 403) {
                    console.warn(`Permission denied for endpoint: ${endpoint}`);
                    // Return an empty result instead of throwing an error
                    return { error: 'insufficient_permissions', data: [] };
                }
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Error in API.put(${endpoint}):`, error);
                throw error;
            }
        }
    
        async delete(endpoint) {
            try {
                const headers = {};
                
                const response = await fetch(`${AxisHub.apiBaseUrl}${endpoint}`, {
                    method: 'DELETE',
                    headers: headers
                });

                // Handle 403 Forbidden errors gracefully
                if (response.status === 403) {
                    console.warn(`Permission denied for endpoint: ${endpoint}`);
                    // Return an empty result instead of throwing an error
                    return { error: 'insufficient_permissions', data: [] };
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Error in API.delete(${endpoint}):`, error);
                throw error;
            }
        }
        
        // Add a method to check if we're authenticated with the backend
        async checkAuth() {
            try {                
                const response = await fetch(`${AxisHub.apiBaseUrl}/api/auth/validate`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    console.log("Token validation failed, clearing token");
                    // Clear the token from localStorage
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('current_user');
                    return false;
                }
                
                return true;
            } catch (error) {
                console.error("Auth check failed:", error);
                // Clear the token from localStorage on error
                localStorage.removeItem('auth_token');
                localStorage.removeItem('current_user');
                return false;
            }
        }
    }
};

// Initialize the API service
if (!AxisHub.state.Api) {
    AxisHub.state.Api = new AxisHub.Api();
}