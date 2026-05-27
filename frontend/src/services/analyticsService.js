import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/v1/analysis`;



export const getDashboardSummary = async (handle) => {

    const response = await axios.get(
        `${API_BASE_URL}/dashboard-summary/${handle}`
    );

    return response.data.data;
};




export const getRatingHistory = async (handle) => {

    const response = await axios.get(
        `${API_BASE_URL}/rating-history/${handle}`
    );

    return response.data.data;
};




export const getTopicStrength = async (handle) => {

    const response = await axios.get(
        `${API_BASE_URL}/topic-strength/${handle}`
    );

    return response.data.data;
};




export const getDifficultyDistribution = async (handle) => {

    const response = await axios.get(
        `${API_BASE_URL}/difficulty-distribution/${handle}`
    );

    return response.data.data;
};




export const getContestPerformance = async (handle) => {

    const response = await axios.get(
        `${API_BASE_URL}/contest-performance/${handle}`
    );

    return response.data.data;
};




export const getHeatmap = async (handle) => {

    const response = await axios.get(
        `${API_BASE_URL}/heatmap/${handle}`
    );

    return response.data.data;
};