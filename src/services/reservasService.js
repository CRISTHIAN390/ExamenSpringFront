const API_URL = 'http://localhost:8080/api/reservas';

export const fetchReservas = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;  
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addReserva = async (reserva) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva)
    });
    return response.json();
  } catch (error) {
    console.error('Error adding reserva:', error);
    throw error;
  }
};

export const updateReserva = async (id, reserva) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva)
    });
    return response.json();
  } catch (error) {
    console.error('Error updating reserva:', error);
    throw error;
  }
};

export const deleteReserva = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  } catch (error) {
    console.error('Error deleting reserva:', error);
    throw error;
  }
};