# **:man: Intro**!

- If you've used **trello** before, you probably won't need to download all attachments for a particular card, unless that's part of your busines logic.

- In this project I implemented my personal MVC solution for do this...

- But how did I do it? The trello api only allows me to collect the urls from the attachments of a given card.

- The process consists of getting the files through their url, saving them, and then compressing the directory to send to the front as a buffer-stream.
- I used promises native's methods, and native HTTP module in node to ensure that all files downloaded correctly before compressing the entire directory. 

### Tecnologies
- NodeJS
- Express
- adm-zip
- Axios
- EJS ( javascript template engine)

@Author: Marcelo Penha Filho

