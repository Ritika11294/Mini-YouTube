let videodata = JSON.parse(localStorage.getItem("clicked_video"));
let recommend = JSON.parse(localStorage.getItem("rec"));

let video_div = document.getElementById("video_details");
function appendVideo() {
    let { videoId, snippet: { title } } = videodata;
    let iframe = document.createElement("iframe")

    iframe.src = `https://www.youtube.com/embed/${videoId}`
    iframe.height = "35%";
    iframe.width = "100%";
    iframe.setAttribute("allowfullscreen", true)
    video_div.append(iframe);
}

appendVideo()




function recom() {
    recommend.map((elem) => {
        let { snippet, id: { videoId } } = elem

        let data_to_send = {
            snippet,
            videoId
        }
        console.log(videodata);

        let title = document.createElement("p");
        title.innerText = snippet.title;

        let thumbnail = document.createElement("img");
        thumbnail.src = snippet.thumbnails.medium.url;

        let div = document.createElement("div");
        div.setAttribute("id", "rec_div")
        div.onclick = () => {                 //event listner
            showVideo(data_to_send)
        }

        div.append(thumbnail, title)

        document.querySelector("#recommendation").append(div)


    })
}

function showVideo(data) {
    localStorage.setItem("clicked_video", JSON.stringify(data))

    window.location.href = "video.html"
}

recom()

