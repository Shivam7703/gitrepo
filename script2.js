
const user = document.getElementById("username");
const per = document.getElementById("pagecount");
const img = document.getElementById("user-dp");

function fetchRepositories(event) {
    event.preventDefault(); 

    const username = user.value;

   
    const apiUrl = `https://api.github.com/users/${username}`;
    const headers = {
        Authorization: 'Bearer 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' 
    };

 
    const section1 = document.getElementById("sec1");
    section1.style.display = 'none';
    const loader = document.getElementById("loader");
    loader.style.display = 'block';

    fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            loader.style.display = 'none';
            const section2 = document.getElementById("sec2");
            section2.style.display = 'block';
            console.log(data);
            display(data);
        })
        .catch(error => console.error('Error fetching repositories:', error));
    fetch2("");
}

function fetch2(word) {
    const username = user.value;
    const perPage = per.value;
    console.log(word);

    const apiUrl2 = `https://api.github.com/search/repositories?q=${word}+user:${username}&per_page=${perPage}`;
    const headers = {
        Authorization: 'Bearer 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' 
    };

    fetch(apiUrl2, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const section2 = document.getElementById("sec2");
            section2.style.display = 'block';
            console.log(data);
            display2(data.items); 
        })
        .catch(error => console.error('Error fetching repositories:', error));
}




function display(data) {
    img.src = data.avatar_url;
    document.getElementById("name").innerHTML = data.name ? data.name : "No name available";
    document.getElementById("email").innerHTML = data.email ? data.email : "No email available";
    document.getElementById("location").innerHTML = data.location ? data.location : "No location available";
    document.getElementById("repo").innerHTML = data.html_url;
}


function display2(data) {
    document.getElementById("contain").innerHTML = "";

    data.forEach(element => {
        const repo = document.createElement('div');
        repo.className = 'repo-d';
        repo.innerHTML = ` <h2>${element.name}</h2>
    <p>${element.description}</p>
    <div style="background-color:red; padding:5px 9px; color:white;">${element.language}</div></p>`;
        document.getElementById("contain").appendChild(repo);
    });
}
