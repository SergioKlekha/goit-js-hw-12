import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const BASE_URL = "https://pixabay.com";
const END_POINT = "/api/";
const API_KEY = "44024733-f77ed4f0ed7e81c67856c8782";

export async function getPosts(searchQuery, page = 1, perPage = 15) {

    // const params = new URLSearchParams({
    //     key: API_KEY,
    //     q: searchQuery,
    //     image_type: 'photo',
    //     orientation: 'horizontal',
    //     safesearch: 'true',
    //     page: page,
    //     per_page: perPage,
    // });

    const url = `${BASE_URL}${END_POINT}`;

    try {
        const response = await axios(url, {
            params: {
                key: API_KEY,
                q: searchQuery,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page,
                per_page: perPage
            }
        });
        return response.data;
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: `Something went wrong. ${error.message}`
        })
    }

};