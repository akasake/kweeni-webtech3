# Kweeni app 

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