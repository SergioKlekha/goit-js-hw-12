function postTemplate(post) {
    return `
        <li class="gallery-item">
            <a href="${post.largeImageURL}">
                <img src="${post.webformatURL}" alt="${post.tags}" class="gallery-item-image">
                <div class="info">
                    <p class="info-title">Likes:<span class="info-value">${post.likes}</span></p>
                    <p class="info-title">Views:<span class="info-value">${post.views}</span></p>
                    <p class="info-title">Comments:<span class="info-value">${post.comments}</span></p>
                    <p class="info-title">Downloads:<span class="info-value">${post.downloads}</span></p>
                </div>
            </a>
        </li>
    `
};

export function postsTemplate(arr) {
    return arr.map(postTemplate).join("");
};