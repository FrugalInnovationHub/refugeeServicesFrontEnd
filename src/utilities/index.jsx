export const imageExists = (imageSrc) => {
    var img = new Image();
    img.src = imageSrc;

    return img.naturalWidth !== 0;
}

export const getLoggedInUserDetails = () => {
    return {
        'userId': localStorage.getItem('mae_currentUserId') || null,
        'type': localStorage.getItem('mae_currentUserType') || null,
        'token': localStorage.getItem('mae_authorization') || null
    }
}