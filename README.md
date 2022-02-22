# vue-boolzapp
#### A Whatsapp Web Clone

I needed a project to work on to keep practicing with CDN-VueJs, and thought that a semi-working clone of Whatsapp web would had worked perfectly fine to learn how to use
Vue at his "basic version" for small projects.

## Technologies
- HTML
- CSS
- VUE

### Features

At the beginning, this clone was supposed to only have a very few features, like:
- switching between already eisting chats
- sending new messages
- an automatically answer from the bot, choosen randomly from a given array of possible answers
- searching in the contact list has to be immediate, showing the corrects contacts and hiding the ones not corresponding to the search query (case insensitive)


But then, once i "finished" it, after a few months when I had to start thinking at my portfolio I tought back to this project, and decided that it would had been worth it to
add some new features, so I added:
- the chance to click on the newly created "chevron-down" of every message, and give the user the chance to
  - edit his own messages
  - delete a message (both sent && received messages)
  - answer to received messages

- the chance to send a picture. Since I have no chance in this project of setting up a database, I've opted for a (it'sugly, I know) prompt dialog, where the user should 
insert the url of a web picture; this url will be used as a "src" attribute of the image.
- clicking on the three dots in the top right corner, a section with the "chat infos" will slide in, showing the contact avatar, the first and last message (with his timestamp)
and the counter of messages with that particular contact. The "chat infos" section could be closed clicking again on the "three dots" or, on the "x" inside of the section itself.

### Conclusion
I do consider this repo kind of closed, I mean, I could sometimes come in here and add some features, like the chanche of changing the background image, or the "search in messages"
feature and maybe giving the chance to also send some GIF and not only pictures, but these are not "officially planned".

![01](https://user-images.githubusercontent.com/87276064/155235017-2b9e2a8a-7728-44f1-9641-44e3303ad526.png)
![02](https://user-images.githubusercontent.com/87276064/155235075-b06fb66a-b84b-4784-bfe7-3994a38e5b4c.png)
![03](https://user-images.githubusercontent.com/87276064/155235079-f4146840-f36f-40cb-990b-c3583c5161ab.png)
![04](https://user-images.githubusercontent.com/87276064/155235080-fcaecbb4-ac26-4476-96be-a18bfb8d0032.png)
