$('document').ready(function(){
    console.log('Ready ...');
    $('#searchUser').on('keyup',function(e){
       let username = e.target.value;
       
       $.ajax({
           url:'https://api.github.com/users/'+username,
           data:{
               client_id:'fae124c866fead62607c',
               client_secret:'5bf48e6bcef7a59656a57cc2cbb0179aa06dd31f',
           }
       }).done(function(user){
          console.log(user);
          $.ajax({
              url: 'https://api.github.com/users/'+username+'/repos',
              data:{
               client_id:'fae124c866fead62607c',
               client_secret:'5bf48e6bcef7a59656a57cc2cbb0179aa06dd31f',
               sort: 'created: asc'
           }
          }).done(function(repos){
                console.log(repos);
             $.each(repos,function(index,repo){
                $('#repos').append(`
                <div class="well">
                    <div class="row">
                        <div class="col-md-7">
                            <strong>${repo.name}</strong> : ${repo.description}
                        </div>
                        
                        <div class="col-md-3">
                        <span class="label label-default">Forks: ${repo.forks_count} </span>
                    <span class="label label-primary">public Watchers: ${repo.watchers_count} </span>
                    <span class="label label-success">Stars: ${repo.stargazars_count} </span>
                        
                        </div>
                        
                        <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                        </div>
                    </div>
                </div>
                `); 
             });
          });
   
          $('#profile').html(`
          <div class="panel panel-default">
          <div class="panel-heading">
            <div class="panel-title">${user.name}</div>
          </div>
              <div class="panel-body">
              <div class="row">
                <div class="col-md-3">
                  <img class="thumbnail avatar" src="${user.avatar_url}" />
                  <a target="_blank" class="btn btn_primary btn_block" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                    <span class="label label-default">Public Repos: ${user.public_repos} </span>
                    <span class="label label-primary">public Gists: ${user.public_gists} </span>
                    <span class="label label-success">Followers: ${user.followers} </span>
                    <span class="label label-info">Following: ${user.following} </span>
                    <br/>
                    <br/>
                    <ul>
                    <li class="list-group-item">Company: ${user.comopany} </li>
                    <li class="list-group-item">Website/blog: ${user.blog} </li>
                    <li class="list-group-item">Location: ${user.location} </li>
                    <li class="list-group-item">Member Since: ${user.created_at} </li>
                    <li class="list-group-item">Company: ${user.comopany} </li>
                    </ul>
                </div>
             </div>
              </div>
              
          </div>
          <h3 class="page-header">Latest Repos</h3>
          <div id="repos"></div>
          `);
       });
    });
})