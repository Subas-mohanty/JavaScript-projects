const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const profileContainerEl=document.getElementById("profileContainer");
const loadingEl=document.getElementById("profileContainer");

// for card
const generateProfile = (profile) => {
  return`
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}">
                    </div>
                    <div class="self">
                        <h1>${profile.name}</h1>
                        <h3>${profile.login}</h3>
                    </div>

                </div>
                <a href='${profile.html_url}'>
                    <button class="primary-btn button">Check profile</button>
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
                    <h3>Repository</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>
    `;
};

const fetchProfile = async () => {
  const username = searchInputEl.value;
  loadingEl.innerText="Loading......";
  loadingEl.style.color="black";
  try {
        const result = await fetch(`${url}/${username}`);
        const data = await result.json();
        if(data){
            loadingEl.innerText="";
            profileContainerEl.innerHTML=generateProfile(data);
        }
        else{
            loadingEl.innerHTML=data.message;
            loadingEl.style.color="red";
        }
        console.log(data);
  } catch (error) {
    console.log(error);
    loadingEl.innerText="";
  }
};
searchBtnEl.addEventListener("click", fetchProfile);
