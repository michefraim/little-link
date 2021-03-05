// import axios from '/axios';

async function requestData(id) {
const response = await axios.get(`http://localhost:3000/api/stats/${id}`)
return response;
}

function InsertElementData(elementId, data) {
    const element = document.querySelector(`#${elementId}`);
    element.innerHTML = data;
}
