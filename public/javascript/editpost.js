// variables
const commentForm = document.querySelector('#comment-form');
const submitBtn = document.querySelector('.submit-btn');
const postId = document.querySelector('#post-id').value;
const deleteBtn = document.querySelector('.deletebtn');

// async function to allow user to edit post, can change the title and content
const commentFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value;
    const content = document.querySelector('#new-post-content').value;

    if (title && content) {
        const response = await fetch(`/api/post/${postId}`, {
            method: "PUT",
            body: JSON.stringify({
                title,
                content,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("POST HAS BEEN SUBMITTED");
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}


// submits edited post on submit
commentForm.addEventListener("submit", commentFormHandler);