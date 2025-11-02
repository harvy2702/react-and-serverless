// API Configuration
export const API_CONFIG = {
  // Local development
  LOCAL_BASE_URL: 'http://localhost:7071/api',
  
  // Azure production
  AZURE_BASE_URL: 'https://classroom-material-api.azurewebsites.net/api',
  
  // Use environment variable to switch between local and production
  get BASE_URL() {
    return import.meta.env.VITE_API_URL || this.LOCAL_BASE_URL;
  },
  
  // API Endpoints
  ENDPOINTS: {
    CLASSES: '/classes',
  }
};

// API Client helper functions
export const classroomAPI = {
  /**
   * Get all classes for a user
   */
  getClasses: async (userId: string, role?: 'teacher' | 'student') => {
    const params = new URLSearchParams({ userId });
    if (role) params.append('role', role);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLASSES}?${params}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },
};
