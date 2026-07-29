import axios from "axios";

const API_URL = "http://localhost:5000";


// Get all schedules
export const getSchedules = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/schedules`
        );

        return response.data;

    } catch (error) {
        console.error(
            "Get schedules error:",
            error.response?.data || error.message
        );

        throw error;
    }
};



// Filter schedules
export const filterSchedules = async (day, facilityId) => {
    try {
        const response = await axios.get(
            `${API_URL}/schedules/filter`,
            {
                params: {
                    day,
                    facility_id: facilityId
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Filter schedules error:",
            error.response?.data || error.message
        );
        throw error;
    }
};