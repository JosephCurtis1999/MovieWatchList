//  delete post

const deletePost = async () => {
    const response = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
    });

    document.location.replace("/dashboard");
};

// deletes post on click
deleteBtn.addEventListener("click", deletePost);