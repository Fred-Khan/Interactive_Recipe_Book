/* JavaScript functionality for the home page */

function homePageFunctions() {
    const copyToClipboard = (platform) => {
        const url = window.location.href;
        const dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert(`The URL has been copied. You can now share it on ${platform}.`);
    };

    const initializeShareLinks = () => {
        const shareLinks = [
            { id: "share-facebook", url: "https://www.facebook.com/sharer/sharer.php?u=" },
            { id: "share-twitter", url: "https://twitter.com/intent/tweet?url=" },
            { id: "share-instagram", action: () => copyToClipboard('Instagram') },
            { id: "share-youtube", action: () => copyToClipboard('YouTube') }
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
    };

    initializeShareLinks();
}

document.addEventListener("DOMContentLoaded", homePageFunctions);
