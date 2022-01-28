async function API(){
    //fetching user profile and displaying
    //fetching data and storing it
    let myInput = document.getElementById("myInput").value
    const response = await fetch("https://api.github.com/users/"+myInput)
    const post = await response.json()

    let avatar  =    post.avatar_url
    let name    =    post.name
    let username=    post.login
    let email   =    post.email
    let location=    post.location
    let gists   =    post.public_gists

    console.log(post)

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = document.getElementById("Name")
    var cell2 = document.getElementById("Username")
    var cell3 = document.getElementById("Email")
    var cell4 = document.getElementById("Location")
    var cell5 = document.getElementById("NumberOfGists")
    var cell6 = document.getElementById("Images")
  

    // Add some text to the new cells:
    cell1.innerHTML = name
    cell2.innerHTML = username
    cell3.innerHTML = email
    cell4.innerHTML = location
    cell5.innerHTML = gists
    cell6.src = avatar

    //fetching user repo data and displaying

    //fetching data and storing it
    const repoResponse = await fetch("https://api.github.com/users/"+myInput+"/repos")
    const repo = await repoResponse.json()

    let repoName   =    repo.map(repo => repo.name)
    let repoDescription    =    repo.map(repo => repo.description)

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var repo1 = document.getElementById("repo1")
    var repo2 = document.getElementById("repo2")
    var repo3 = document.getElementById("repo3")
    var repo4 = document.getElementById("repo4")
    var repo5 = document.getElementById("repo5")
    var repo6 = document.getElementById("repo6")
  

    // Add some text to the new cells:
    repo1.innerHTML = repoName[0]+"<br>"+repoDescription[0]
    repo2.innerHTML = repoName[1]+"<br>"+repoDescription[1]
    repo3.innerHTML = repoName[2]+"<br>"+repoDescription[2]
    repo4.innerHTML = repoName[3]+"<br>"+repoDescription[3]
    repo5.innerHTML = repoName[4]+"<br>"+repoDescription[4]
    repo6.innerHTML = repoName[5]+"<br>"+repoDescription[5]

}

