// Function to generate a random 5-digit ID
function generateRandomID() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Function to load the profile picture from local storage
function loadProfilePic() {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
        document.getElementById('profilePic').src = savedPic;
    }
}

// Function to load user data from local storage
function loadUser() {
    const existingUserID = localStorage.getItem('currentUserID');
    if (existingUserID) {
        const userData = JSON.parse(localStorage.getItem(existingUserID));
        if (userData) {
            document.getElementById('profilePic').src = userData.profilePic;
            document.getElementById('chatUserID').innerText = existingUserID; // Display user ID
        }
    } else {
        const username = prompt("Enter your username:");
        const userID = generateRandomID();
        const userData = {
            username: username,
            profilePic: 'default-profile.png', // Default profile picture
            friends: []
        };
        localStorage.setItem(userID, JSON.stringify(userData));
        localStorage.setItem('currentUserID', userID);
        document.getElementById('chatUserID').innerText = userID; // Display user ID
    }
}

// Function to change the avatar
function changeAvatar() {
    document.getElementById('fileInput').click();
}

// Load profile picture and user data when the page loads
window.onload = function() {
    loadProfilePic();
    loadUser();
};

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;
            document.getElementById('profilePic').src = imageSrc;

            // Save the profile picture in local storage
            const currentUserID = localStorage.getItem('currentUserID');
            if (currentUserID) {
                const userData = JSON.parse(localStorage.getItem(currentUserID));
                userData.profilePic = imageSrc;
                localStorage.setItem(currentUserID, JSON.stringify(userData));
            }
        };
        reader.readAsDataURL(file);
    }
});

// Logout function
function logout() {
    localStorage.removeItem('currentUserID');
    window.location.href = 'login.html'; // Redirect to login page
}

// Edit profile function
function editProfile() {
    const newUsername = prompt("Enter your new username:");
    const currentUserID = localStorage.getItem('currentUserID');
    if (currentUserID) {
        const userData = JSON.parse(localStorage.getItem(currentUserID));
        userData.username = newUsername;
        localStorage.setItem(currentUserID, JSON.stringify(userData));
    }
    alert("Profile updated!");
}

// Change password function
function changePassword() {
    const newPassword = prompt("Enter your new password:");
    // You could implement actual password functionality here
    alert("Password changed! (This feature is not fully implemented)");
}

// Toggle options visibility
function toggleOptions() {
    const optionsBox = document.getElementById('optionsBox');
    optionsBox.style.display = optionsBox.style.display === 'block' ? 'none' : 'block';
}

// Hide options box when clicking outside
window.addEventListener('click', function(event) {
    const optionsBox = document.getElementById('optionsBox');
    if (optionsBox.style.display === 'block' && !optionsBox.contains(event.target) && !document.getElementById('profileContainer').contains(event.target)) {
        optionsBox.style.display = 'none';
    }
});

// Function to toggle chat (to be implemented)
function toggleChat() {
    alert('Chat functionality not implemented yet.');
}
