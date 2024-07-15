const API_URL = 'http://localhost:8080/api/garajes';

export const fetchGarajes = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;  
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addGaraje = async (garaje) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(garaje)
    });
    return response.json();
  } catch (error) {
    console.error('Error adding garaje:', error);
    throw error;
  }
};

export const updateGaraje = async (id, garaje) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(garaje)
    });
    return response.json();
  } catch (error) {
    console.error('Error updating garaje:', error);
    throw error;
  }
};

export const deleteGaraje = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  } catch (error) {
    console.error('Error deleting garaje:', error);
    throw error;
  }
};