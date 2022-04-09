const commentForm = document.querySelector("#comment-form");
const submitBtn = document.querySelector(".submit-btn");

const commentFormHandler = async (event) => {
    event.preventDefault();

    // title and content
    const title = document.querySelector("#new-post-title").value;
    const content = document.querySelector('#new-post-content').value;

    // sending request
    if (title && content) {
        const response = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({
                title,
                content,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

commentForm.addEventListener("submit", commentFormHandler);

// Inactivity function to time the user out

const inactivityTime = () => {
    let time;
    const resetTimer = () => {
        clearTimeout(time);
        time = setTimeout(logout, 10000);
    };
    window.onload = resetTimer;

    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    const logout = () => {
        alert("Session has time out, please log in");
    };
};