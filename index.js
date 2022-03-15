let API = "AIzaSyD7eLy06XcpMQZ-NAmLlvmjbHU1vE2Q6RI";
// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=tesla&key=[YOUR_API_KEY]'

let search_results_div = document.getElementById("search_results");

async function searchVideo() {

    try {
        let video_query = document.getElementById("video").value;

        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video_query}&type=video&key=${API}&maxResults=20`);

        let data = await response.json();
        // console.log("data:", data)
        let videos = data.items;


        appendVideos(videos);
        


    } catch (e) {
        console.log("e:", e);
    }

}

async function popularVideo() {

    try {

        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=masaischool&type=video&key=${API}&maxResults=20`);

        let data = await response.json();
         console.log("data:", data)
        let videos = data.items;

        appendVideos(videos);


    } catch (e) {
        console.log("e:", e);
    }

}
popularVideo()

const appendVideos = (items) => {
    //console.log("items:", items)
    search_results_div.innerHTML = null
    localStorage.setItem("rec", JSON.stringify(items))
    items.forEach(({ snippet, id: { videoId } }) => {
        console.log("snippet:", snippet);
        // console.log("el:", el);

        //let v_id = el.id.videoId


        // console.log("videoId:", videoId);

        let div = document.createElement("div");

        let title = document.createElement("p");
        title.innerText = snippet.title;

        let thumbnail = document.createElement("img");
        thumbnail.src = snippet.thumbnails.medium.url;

        let data_to_send = {
            snippet,
            videoId
        }
        div.onclick = () => {                 //event listner
            showVideo(data_to_send)
        }

        div.append(thumbnail, title)

        search_results_div.append(div);
    });
};


function showVideo(data) {
    localStorage.setItem("clicked_video", JSON.stringify(data))

    window.location.href = "video.html"
}

