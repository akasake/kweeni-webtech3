# Kweeni app 

### Guide to branches

#### User specific branches
>master is everything merged
 > - Benchaphon: Sass and Pham
 > - Roel: Roel
 > - Robert: master-test

#### User specific features 
##### Benchaphon:
> - Sass and Bem: Master, kweeni-details page
> - Gulp: Sass, live-reload
> - MongoDB: Master, kweeni page sockets and save
##### Roel:
> -
##### Robert:
> - 

### To do before 19-04-2018:

##### Step 1 -> Rewrite css classes in BEM format 
>Exampe: 
> - Block: class=form 
> - Item: class=form__button 
> - Modifier: class=form__button--danger

##### Step 2 -> Convert the HTML page into PUG

>Use this website:
> - [HTML2Jade](http://html2jade.org/)

##### Step 3 -> place the newly created files in the right directory and delete the old files




### To do before 26-04-2018:

##### ! Recommended Visual Studio Code User Settings for this project !

```
"liveSassCompile.settings.formats":[
        {
            "format": "compressed",
            "extensionName": ".css",
            "savePath": "/public/stylesheets"
        }
    ]
```

##### Theme

>Contains all variables: 
> - colors
> - fonts
> - border radius
> - ...

##### Components

>Re-usable small parts of the page: 
> - images
> - buttons
> - ...

##### Partials

>Larger chunks of pages that are unique to this app: 
> - header
> - title
> - ...


### lokaal runnen op https
##### Stappenplan
> - 1) ngrok.exe in het project runnen
> - 2) gegenereerde https link kopieren
> - 3) naar facebook developer dashboard gaan, naar Facebook Login > Settings
> - 4) de https link van ngrok+"auth/facebook/rederict" ingeven in "Valid OAuth Redirect URIs" op facebook
> - 5) Save changes op facebook
> - 6) in code, config, passport-setup: callbackURL (lijn 19) veranderen naar dzelfde link als is ingegeven op facebook
> - 7) runnen met nodemon
> - 9) mongo lokaal opstarten ("mongod")
> - 10) in het project, config > keys , "dbURI: 'mongodb://localhost:27017/'" uit comments zetten
> - 11) naar ngrok gegenereerde link surfen