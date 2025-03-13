import { API_BASE_URL } from "../api/apiConfig";

export async function fetchGeneralStats(json, type) {
  try {
    const url = `${API_BASE_URL}/data_exposure/get-${type}-general-stats`;
    const typeId = type + "_id";
    const bodyToSend = {
      [typeId]: json[typeId],
      start_date: json.start_date,
      end_date: json.end_date,
    };

    if (type === "floor" && json.floors_id) {
      bodyToSend.floors_id = json.floors_id;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSend),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      //console.log("Fetch aborted");
    } else {
      console.error("Error fetching campaign cards data", error);
    }
    throw error;
  }
}
export async function fetchObserverStats(json, type) {
  try {
    const url = `${API_BASE_URL}/data_exposure/get-${type}-observer-stats`;

    const typeId = type + "_id";
    const bodyToSend = {
      [typeId]: json[typeId],
      start_date: json.start_date,
      end_date: json.end_date,
    };

    if (type === "floor" && json.floors_id) {
      bodyToSend.floors_id = json.floors_id;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSend),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      //console.log("Fetch aborted");
    } else {
      console.error("Error fetching campaign cards data", error);
    }
    throw error;
  }
}
export async function fetchAudienceGraph(json, type) {
  try {
    const url = `${API_BASE_URL}/data_exposure/get-${type}-audience-graph`;

    const typeId = type + "_id";
    const bodyToSend = {
      [typeId]: json[typeId],
      start_date: json.start_date,
      end_date: json.end_date,
    };

    if (type === "floor" && json.floors_id) {
      bodyToSend.floors_id = json.floors_id;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSend),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      //console.log("Fetch aborted");
    } else {
      console.error("Error fetching campaign cards data", error);
    }
    throw error;
  }
}
export async function fetchOcupationGraph(json, type) {
  try {
    const url = `${API_BASE_URL}/data_exposure/get-${type}-gate-graph`;

    const typeId = type + "_id";
    const bodyToSend = {
      [typeId]: json[typeId],
      start_date: json.start_date,
      end_date: json.end_date,
    };

    if (type === "floor" && json.floors_id) {
      bodyToSend.floors_id = json.floors_id;
    }
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSend),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();    

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      //console.log("Fetch aborted");
    } else {
      console.error("Error fetching campaign cards data", error);
    }
    throw error;
  }
}
export async function fetchHeatMapGraph(json, type) {
  try {
    const url = `${API_BASE_URL}/data_exposure/get-${type}-heat-map-graph`;

    const typeId = type + "_id";
    const bodyToSend = {
      [typeId]: json[typeId],
      start_date: json.start_date,
      end_date: json.end_date,
    };

    if (type === "floor" && json.floors_id) {
      bodyToSend.floors_id = json.floors_id;
    }
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSend),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();    

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      //console.log("Fetch aborted");
    } else {
      console.error("Error fetching campaign cards data", error);
    }
    throw error;
  }
}
