---

title: Treap presentation for NCTU PCCA wintercamp 2020
tags: presentation, PCCA, 2020, CPsite
author : maxwill lin, yan-tong lin
description : "my first md/latex/draw.io slides from scratch"
slideOptions:  
  theme: sky
  transition: slide
  hash : true
  history: true
updatehistory : "add to cpsite at 2020/2/27"

---


<!-- CSS -->
<style>
div.left {
    text-align: left;
}
</style>

<style>
div.small {
    font-size: 0.85em;
}
</style>


### Ping Pong
- Javascript Web Programming Final
- Jan 5, 2021
- 0712238 Yan-Tong Lin

---

### Overview
- The Game
- Implementation
- Demo Time

---

### Game

<small>

- A Traditional Ping Pong Game
- One player v.s. Easy AI
    - who follows the ball after the ball passes mid line

</small>

---


### Implementation
- Phaser 3
![](https://i.imgur.com/BzY7vYu.jpg =30%x)
- Include by 
    - `script type="text/javascript" src="lib/phaser.min.js"></script>`

---

### Phaser 3

<small>

- Load
    - load images
- Create
    - inital state of ball and players
- Update
    - collision and score
- For Physics(Collision Detection, etc.)
    - delt with arcade in "update" function
    - set worldbound + movable or not

</small>

---

### Source Code Link
- https://github.com/EazyReal/Javascript-Web-Programming-2020-fall/tree/main/pong

---

### Demo Time
- 

---