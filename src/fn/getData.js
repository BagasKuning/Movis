import axios from "axios";

const getData = async (url) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                // still have problem env !!!
                `Bearer ${process.env.REACT_APP_AUTH}`
        },
    };

    try {
        const response = await axios(url, options)
        return response.data
    } catch (error) {
        // Handle error
        // console.error("Error:", error);
    }
};

export default getData