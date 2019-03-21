# osu_2007
Wanna know how osu! was back in 2007? Well now's your chance!
## Setting up
### Dependencies
Node.js (tested on 10.x LTS)
MySQL
Nginx (if hosting on a server and you want multiple connections)
### Configuring
`npm install` and `cp config.sample.json config.json` then edit the config in a text editor (`vim config.json`). 
## Connecting (locally)
### Windows
Edit your hosts file seen at (C:\Windows\System32\drivers\etc\hosts) with a text editor and add the following line:
```
127.0.0.1   osu.ppy.sh
```
Save, open osu!2007 and you're ready!
### (GNU/)Linux + OSX
Edit the hosts file seen at (/etc/hosts) with a text editor (i.e vim) and add the following line:
```
127.0.0.1   osu.ppy.sh
```
Save, open osu!2007 and you're ready!

## Screenshots
![Main Menu](/images/screenshot_1.png?raw=true "Main Menu")
![Scores](/images/screenshot_2.png?raw=true "Scores")