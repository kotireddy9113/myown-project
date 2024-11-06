const axios = require('axios');

const JDoodle = {
    clientId: '7d700b0b16439a6955e5eaaab0228f9d', // Replace with your JDoodle client ID
    clientSecret: 'fa3f05c1b0b1b54374049ffb70141da227548aa6f96607267a7f582d79605a70', // Replace with your JDoodle client secret

    executeCode: async (language, versionIndex, code) => {
        const url = 'https://api.jdoodle.com/v1/execute';
        const data = {
            script: code,
            language: language,
            versionIndex: versionIndex,
            clientId: JDoodle.clientId,
            clientSecret: JDoodle.clientSecret,
        };

        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            console.error('Error executing code:', error.response ? error.response.data : error.message);
            throw error; // Propagate the error
        }
    },
};

module.exports = JDoodle;
