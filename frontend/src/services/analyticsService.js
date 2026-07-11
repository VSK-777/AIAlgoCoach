import api from "../api/axiosConfig";


export const getDashboardSummary = async (handle) => {

    const response = await api.get(
        `/v1/analysis/dashboard-summary/${handle}`
    );

    return response.data.data;
};




export const getRatingHistory = async (handle) => {

    const response = await api.get(
        `/v1/analysis/rating-history/${handle}`
    );

    return response.data.data;
};




export const getTopicStrength = async (handle) => {

    const response = await api.get(
        `/v1/analysis/topic-strength/${handle}`
    );

    return response.data.data;
};




export const getDifficultyDistribution = async (handle) => {

    const response = await api.get(
        `/v1/analysis/difficulty-distribution/${handle}`
    );

    return response.data.data;
};




export const getContestPerformance = async (handle) => {

    const response = await api.get(
        `/v1/analysis/contest-performance/${handle}`
    );

    return response.data.data;
};




export const getHeatmap = async (handle) => {

    const response = await api.get(
        `/v1/analysis/heatmap/${handle}`
    );

    return response.data.data;
};