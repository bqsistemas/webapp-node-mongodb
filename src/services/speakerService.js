import axios from 'axios'

function speakerService(){
    function getSpeakerById(id){
        return new Promise((resolve, rejected) => {
            axios.get(`http://localhost:3000/speakers/${id}`)
            .then((response) => {
                resolve(response)
            }).catch((error) => {
                rejected(error)
            })
        })
    }

    return { getSpeakerById }
}

export default speakerService()