const signupFormHandler = async (event) => {
    event.preventDefault();


// getting variables from signup handlebars
 const username = document.querySelector('#username-signup').value.trim();
 const password = document.querySelector('#password-signup').value.trim();

// logging the user signing up
 console.log(`Signing up ${username}`);

 const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
        username,
        password,
    }),
    headers: { "Content-Type": "application/json" },
 });
 if (response.ok) {
    console.log("Signed up");
    document.location.replace("/dashboard");
 } else {
    alert("Sign up failed");
 }
};

// event listener for sign up form
document.querySelector(".signup-form")
document.addEventListener("submit", signupFormHandler);

