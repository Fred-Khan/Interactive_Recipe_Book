/* JavaScript functionality for the home page */

document.addEventListener("DOMContentLoaded", () => {
    const shareLinks = [
        { id: "share-facebook", url: "https://www.facebook.com/sharer/sharer.php?u=" },
        { id: "share-twitter", url: "https://twitter.com/intent/tweet?url=" },
        // Instagram sharing isn't possible via a direct URL method apperently.
        { id: "share-instagram", action: () => alert("Use Instagram app to share this recipe.") },
        { id: "share-youtube", action: () => alert("Share on YouTube feature is not available.") }
    ];

    shareLinks.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                if (link.url) {
                    const url = window.location.href;
                    const shareUrl = `${link.url}${encodeURIComponent(url)}`;
                    window.open(shareUrl, "_blank");
                } else if (link.action) {
                    link.action();
                }
            });
        }
    });
});