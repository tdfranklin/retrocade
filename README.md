# Retrocade

### Retrocade is a retro-style arcade gaming app built with React. Currently only Pong and Snake are available, but additional games might be added in the future.  Also, feel free to fork this repo and add games yourself.

---
### [Here is a live version of this application](https://retrocade-tdf.herokuapp.com/)
---

![home screen](https://i.imgur.com/7NjcdeH.jpg)

---

## Technologies Used

- NodeJS
- ExpressJS
- MongoDB
- Mongoose
- ES6
- React(Create-React-App)
- Heroku

## Explanation

Retrocade is my capstone project for Bloc.  I was given the freedom to create any application and use any technologies that I wanted.  I then had to create user stories and wireframes for the project.  Once that was complete, I created a Github repository and added milestones and issues to help me keep track of those user stories.  I then started building the application.

I had been thinking about what I wanted to do for my capstone for several weeks prior to actually starting on it.  I had several ideas for projects that I was interested in creating, however it was actually the project I did right before my capstone that led me to create Retrocade.  I built a Pong game using HTML5 Canvas and pure Javascript.  Once I completed that project, I had such a good time, I wanted to take it one step further.  I wanted to create a site that gave users the feeling of playing on an arcade in the 80s.  I also wanted to expand my knowledge and experience with modern frameworks and libraries, so I knew I wanted to create a full stack application with Node and React.

## Problem

The first problem is that I was learning several new technologies for this project, so I had to actually learn them before I even started writing code.

## Solution

I know a large percentage of people prefer to learn-by-doing, but I subscribe to the learn-by-example crowd.  So I spent about two weeks watching tutorials, reading documentation, and looking at React applications on GitHub to get a feel for how to organize and write the code.

I started with YouTube, watching people build applications using Node/Express and/or React, just trying to get a feel for the code.  Once I felt I had a decent grasp, I read through the documentation and started browsing other people's projects.  Then I started writing actual code.

## Problem

My next main problem was utilizing the reusability with React.  One of the biggest strengths of React is the plug-and-play nature of it's components to help keep your code DRY.

Originally, I had built custom components for each game's home screen, difficulty screen, and score screen.  However, I quickly noticed that there was actually very little difference in how I was using these components.  They were fulfilling almost the exact same purpose, just displaying different options and/or text.  I knew this was a good place to start making my application more DRY and make some reusable components.

## Solution

React props came to the rescue here.  With the Game Home screen, all I needed was to be able to pass down different instructions based on the game that the user had selected to play.

So I created a helper file to hold the instructions and then just passed them to a component as props based on what game was selected.

```javascript
import { PongInstructions, SnakeInstructions } from './helpers/instructions';

{this.state.game === 'Pong' &&
    <GameHome
        instructions={PongInstructions}
        game={this.state.game}
    />
}
{this.state.game === 'Snake' &&
    <GameHome
        instructions={SnakeInstructions}
        game={this.state.game}
    />
}
```

With the instructions passed down as props, it was as easy as looping through them to display line by line:

```javascript
loadInstructions() {
    const game = this.props.game;
    const instructions = this.props.instructions;
    let yPos = 100;

    SetCanvasText('deeppink', game, '50px', 300, 55, 'canvas');        

    for (let line of Object.entries(instructions)) {
        SetCanvasText('chartreuse', line[1], '25px', 20, yPos, 'canvas');
        yPos += 40;
    }
}
```

Once I did this for the game home screen, it was pretty easy to duplicate a similar process for the difficulty and leaderboard components.

## Problem

Another problem I had was when I was writing the Snake game.  Turns out, there was a bug in the code that would allow the snake head to turn around and "eat" the second segment of the body if you pressed two directions quickly enough which would trigger the end of the game.  For instance, if you were moving down, you would be unable to move up, but if you pressed left and then up quickly enough, the game would end immediately with the snake seeming to stay in the same position.

## Solution

After some debugging, I discovered that while I had put a "safety" check in place to prevent being able to move in the opposite direction that the snake is currently going in (cannot go up if down, left if right, etc), the keydown event was happening outside of the actual game loop.  So if you pressed the keys fast enough, you could actually change the direction twice before the loop actually happened and the snake updated, which would cause it to move in the opposite direction and "eat" it's own body.

To resolve the issue, I decided to simply add a new state that was set to true when the direction was changed (and thus not allowing any additional direction changes to happen):

``` javascript
switch(keyPress) {
    case 'ArrowLeft':
        if (direction !== 'right' && !this.state.dirChanged) {
            direction = 'left';
        }
        break;
    ...
}
this.setState({direction: direction, dirChanged: true});
```

And then at the end of the gameloop and the snake updated, it would change it back to false (and again allow for another direction change):

```javascript
this.setState({
    snake: snake,
    score: score,
    dirChanged: false
});
```

## Results

I am pretty happy with the results.  While the games are pretty basic (I've only coded Pong and Snake so far in the short few weeks I worked on this project), it will be very quick and easy to add new games in the future.  And I feel pretty good about the theme.  I think it has a very light and fun feel.

## Conclusion

This project, more than any other, has really helped to build my confidence as a web developer.  While the overall scale of it is small, I was able to learn multiple new technologies and bring my vision to light in a very short period of time.  I now feel confident that I am able to learn any framework or library and build an application.