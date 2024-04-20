import axios from 'axios'

export const apiClient = axios.create(
    {
        // baseURL: 'http://localhost:8080'
        baseURL: 'http://Onkitchen8-env.eba-afsmgqmf.us-west-1.elasticbeanstalk.com'
    }
);