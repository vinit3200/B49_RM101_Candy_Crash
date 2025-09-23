## B49_RM101_Candy_Crash

# 🍬 Candy Crush Clone

A **Candy Crush-style Match-3/Match-4 Game** built using **HTML, CSS, and JavaScript**.  
This project recreates the core mechanics of Candy Crush, including a grid-based board, match-3/match-4 logic, score tracking, with limited time to Make High Score.

---

## Deploy Link 
- https://warm-trifle-46d6ee.netlify.app/

## 📝 Overview
This is a **browser-based puzzle game** where players swap candies on an 9x9 grid to form matches of three or four identical candies/fruits.  
When matches are made, candies/fruits disappear, points are scored, and new candies fall into place.

The goal is to **score as many points as possible within 3 mins**.

---

## ✨ Features
✅ 9x9 interactive candy grid  
✅ Swap adjacent candies (drag-and-drop or click-to-swap)  
✅ Match-3/Match-4 elimination logic (row & column matches)  
✅ Gravity effect (candies fall to fill empty spaces)  
✅ Random new candies generated  
✅ Score system updates dynamically  
✅ Limited time period (3 minets)  
✅ Game Over screen with restart option and show total score 

---

## 🛠️ Tech Stack
- **HTML5** → Structure of the game board and UI  
- **CSS3** → Styling, layout, and design  
- **JavaScript (ES6)** → Game logic, match detection, score handling, and timely control  

---

## 🎮 Game Rules
1. You start to play when timer start.  
2. Swap two adjacent candies.  
3. If the swap creates a line of **3 or 4 identical candies**, they are cleared.  
4. Cleared candies give points:  
   - 3 candies = 3 points  
   - 4 candies = 4 points  
   - 5 candies = 5 points  
5. After clearing, candies above fall down and new ones appear at the top.  
6. If no valid move is possible, you must try another swap.  
7. The game ends when you run out of time.

---

## 🎯 How to Play
- **Swap candies** by dragging and swapping with an adjacent candy.  
- **Form matches** of 3 or 4 candies of the same type.  
- **Earn points** for every successful match.  
- **Play until time run out**.  
- At the end, your **final score** is displayed.

---

## 📂 Project Structure
candy-crush-clone/
│──gameproject
│   │── images/ # (Optional) Candy images/icons
│   │── index.html # Main game HTML file
│   │── style.css # Game styling
│   │── script.js # Game logic (JavaScript)
│
│── README.md # Project documentation

## ⚙️ Setup Instructions
1. Clone or download this repository:  
   ```bash
   git clone https://github.com/vinit3200/B49_RM101_Candy_Crash.git
   cd B49_RM101_Candy_Crash

2. Open gameproject folder and open index.html in your browser.

3. Start playing 🎉  


## 🚀 Future Enhancements

- Add special candies (striped, wrapped, color bomb).

- Add level progression with different goals.

- Add timer-based mode (score as much as possible in 60 seconds).

- Add sound effects and background music.

- Save high scores using localStorage or a backend.

