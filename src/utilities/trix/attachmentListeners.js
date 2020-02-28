import { getToken } from "../../helpers/AuthHelpers";

export const uploadAttachment = ({ attachment }) => {
    const file = attachment.file;
    const formData = new FormData();

    console.log(file);

    formData.append("Content-Type", file.type);
    formData.append("image", file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.REACT_APP_BACKEND_ENDPOINT + '/api/trix_uploads', true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);

    xhr.upload.onprogress = (event) => {
        const progress = event.loaded / event.total * 100;
        attachment.setUploadProgress(progress);
    }

    xhr.onload = () => {
        if (xhr.status === 201) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            return attachment.setAttributes({
                url: data.url,
                href: data.url
            });
        }
    }

    return xhr.send(formData);
}