const uploadAttachment = (attachment) => {
    console.log('send file to server')
    console.log(process.env.REACT_APP_BACKEND_ENDPOINT)
}

document.addEventListener('trix-attachment-add', function (event) {
    const attachment = event.attachment;

    if (attachment) {
        uploadAttachment(attachment);
    }
});