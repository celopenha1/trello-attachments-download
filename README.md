# **:man: Intro**!

- If you've used **trello** before, you probably won't need to download all attachments for a particular card, unless that's part of your busines logic.

- In this project I implemented my personal MVC solution for do this...

- But how ?!!!!! The trello api only allows me to collect urls from the attachments of a given card.

- The process consists of getting the files through their url, saving them, and then compressing the directory to send to the front as a buffer-stream.
- I used promises native's methods, and native HTTP module in node to ensure that all files downloaded correctly before compressing the entire directory. 

- To run this project locally, you'll need to create a .en with theses infos that you can find in Trello API website.
  (TRELLO_API_TOKEN,
  TRELLO_API_KEY,
  TRELLO_BOARD_ID,
  TRELLO_OAUTH_SECRET)
- Clone this repo and make some api calls. Have fun :)



### Tecnologies
- NodeJS
- Express
- adm-zip
- Axios
- EJS ( javascript template engine)

@Author: Marcelo Penha Filho

