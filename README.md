# classic-osu

## Setting up
### Dependencies
Node.js (tested on 16.x LTS)
MySQL
Nginx (if hosting on a server and you want multiple connections)
### Configuring
`npm install` and `cp config.sample.json config.json` then edit the config in a text editor (`nano config.json`). 
## Connecting (locally)
### Windows
Edit your hosts file seen at (C:\Windows\System32\drivers\etc\hosts) with a text editor and add the following line:
```
127.0.0.1   osu.ppy.sh
```
Save, open classic-osu and you're ready!
### Linux + OSX
Edit the hosts file seen at (/etc/hosts) with a text editor (i.e nano) and add the following line:
```
127.0.0.1   osu.ppy.sh
```
Save, open classic-osu and you're ready!
