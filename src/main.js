import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getPosts } from "./js/pixabay-api";
import { postsTemplate } from "./js/render-functions";

const selectors = {
    form: document.querySelector(".search-form"),
    postsGallery: document.querySelector(".gallery"),
    loader: document.querySelector(".loader"),
    loadMoreBtn: document.querySelector(".load-more"),

};

selectors.loader.classList.add("hidden");
selectors.loadMoreBtn.classList.add("hidden");

const lightbox = new SimpleLightbox(".gallery a");

let page = 1;
let totalHits = 0;
let query = "";


async function handleSubmit(event) {

    event.preventDefault();
    selectors.postsGallery.innerHTML = "";
    page = 1;

    query = event.target.elements.searchQuery.value.trim();

    if (!query) {
        iziToast.info({
            title: "No data",
            message: "Please enter a search query"
        });
        return;
    }

    selectors.loader.classList.remove("hidden");
    
    try {
        
        const data = await getPosts(query, page);
        totalHits = data.totalHits;

        if (totalHits === 0) {
            iziToast.warning({
                title: "No result",
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
            selectors.loadMoreBtn.classList.add("hidden");
        }

        const markup = postsTemplate(data.hits);
        selectors.postsGallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();

        if (totalHits > 15) {
            selectors.loadMoreBtn.classList.remove("hidden");
        }

    } catch (error) {
        iziToast.error({
            title: "Error",
            message: `Something went wrong. ${error.message}`
        })
    } finally {
        selectors.loader.classList.add("hidden");
        event.target.reset();
    }
}

selectors.form.addEventListener("submit", handleSubmit);




async function handleLoadMore() {
    
    page += 1;
    selectors.loader.classList.remove("hidden");


    try {
        const data = await getPosts(query, page);
        const markup = postsTemplate(data.hits);
        selectors.postsGallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();

        const item = document.querySelector(".gallery-item");
        const itemHeight = item.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: itemHeight * 2,
            behavior: "smooth"
        })

        totalHits = data.totalHits;

        if (totalHits <= page * 15) {
            selectors.loadMoreBtn.classList.add("hidden");
            iziToast.info({
                title: 'End of results',
                message: "We're sorry, but you've reached the end of search results.",
            });
        }

    } catch (error) {
        iziToast.error({
            title: "Error",
            message: `Something went wrong. ${error.message}`
        });
    } finally {
        selectors.loader.classList.add('hidden');
    }

}

selectors.loadMoreBtn.addEventListener("click", handleLoadMore);