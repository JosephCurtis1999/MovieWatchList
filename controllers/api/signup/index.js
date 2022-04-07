const express = require("express");
const { Student } = require("../../../models");

const router = express.Router();

const signupFormHandler = async function(event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-signup');
    const passwordEl = document.querySelector('#password-signup');
    fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        })
    })
};

document.querySelector("#signup-form")
document.addEventListener("#submit", signupFormHandler);