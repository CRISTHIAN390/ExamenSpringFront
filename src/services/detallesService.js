const API_URL = 'http://localhost:8080/api/detalles';

export const fetchDetalles = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;  
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addDetalle = async (detalle) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detalle)
    });
    return response.json();
  } catch (error) {
    console.error('Error adding detalle:', error);
    throw error;
  }
};

export const updateDetalle = async (id, detalle) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detalle)
    });
    return response.json();
  } catch (error) {
    console.error('Error updating detalle:', error);
    throw error;
  }
};

export const deleteDetalle = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  } catch (error) {
    console.error('Error deleting detalle:', error);
    throw error;
  }
};