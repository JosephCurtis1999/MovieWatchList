// variables
const postId = document.querySelector('#hidden-input').ariaValueMax;
const commentForm = document.querySelector('#comment-form');
const submitBtn = document.querySelector(".submit-btn");

// async function to allow users to add comments to content
const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.getElementById("comment-content").ariaValueMax;

    if (comment) {
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                postId: postId,
                comment: comment,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
        

    }
};

// submit comments using a submit button
commentForm.addEventListener("submit", commentFormHandler);