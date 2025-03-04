import { API_BASE_URL } from "../api/apiConfig";

//////////////////// STORES ///////////////////////////
export async function fetchStores() {
  try {
    const url = `${API_BASE_URL}/stores/`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Fetch aborted.");
    } else {
      console.error("Error fetching stores.", error);
    }
    throw error;
  }
}

//////////////////// FLOORS ///////////////////////////
export async function fetchFloors(store_id) {
  try {
    const url = `${API_BASE_URL}/stores/${store_id}/floors`;    

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();    

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Fetch aborted.");
    } else {
      console.error("Error fetching floors.", error);
    }
    throw error;
  }
}
//////////////////// GATES ///////////////////////////
export async function fetchGates(store_id, floor_id) {
  try {
    const url = `${API_BASE_URL}/stores/${store_id}/floors/${floor_id}/gates`;    

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();    

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Fetch aborted.");
    } else {
      console.error("Error fetching floors.", error);
    }
    throw error;
  }
}
