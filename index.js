const url = "https://api.github.com/users";
const searchInputEL = document.getElementById("searchInput");
const searchButtonEL = document.getElementById("searchBtn");
const profileContainerEL = document.getElementById("profileContainer");
const loadingEL = document.getElementById("loading");

const generateProfile =(profile) => {
    return `
        
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="avatar"/>
                    </div>
                    <div class="self">
                        <h1>${profile.name}</h1>
                        <h1>@${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_black">
                <button class="primary-btn">Check Profile</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio}</p>

            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>Following</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3>Repo</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>
        `
}


const fetchProfile = async () => {
    const username= searchInputEL.value;

    loadingEL.innerText= "loading....";
    loadingEL.style.color="white";
    try {

        const res = await fetch(`${url}/${username}`)
        const data = await res.json();
        if(data.bio){
            loadingEL.innerText="";
            profileContainerEL.innerHTML=generateProfile(data);
        }else{
                loadingEL.innerHTML= data.message;
                loadingEL.style.color="white";
            profileContainerEL.innerText="";

        }
        console.log("data", data);
    
    } catch (error) {
        console.log({error});
        loadingEL.innerText="";
    }

};

searchButtonEL.addEventListener("click",fetchProfile);