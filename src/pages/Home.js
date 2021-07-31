import React from 'react';
import {Container, Statistic} from 'semantic-ui-react';
import {Controller, Scene} from 'react-scrollmagic';
import tinycolor from 'tinycolor2';
import 'semantic-ui-css/semantic.min.css';
import './legible.css';

const explanatoryText = 'Start typing to begin. Press space to scroll down.';

const newText = `
Can you remember your first underground tunnel? The bulkhead steps that were covered in spiderwebs? Your great uncle’s wine cellar? The New York subway system? Mine was a concrete pipe that the local creek ran through. At the other end of the creek, my friend Jackson and I spent afternoons leading toy army men in amphibious assaults along its banks. Bazookas fired, machine guns rattled, an infantry corporal called in for air support. But at the other end from where we played, the creek fed into an imposing tunnel which seemed to have its own private night going throughout all hours of the day. Emily, Jackson’s older sister, always stole the hair off my Playmobil figures to annoy me. She had the idea of walking through the tunnel. More scary than the tunnel was being the only one too afraid to go into the tunnel. The creek ran through the bottom of it so you had to spread your legs out to either side to avoid it. It was tame as tunnels go. It had no twists, no turns, no trap doors or criminals hiding from the law. I remember the experience as a palindrome: the brightness of the day faded into the dimness of the tunnel’s entrance and the tunnel’s entranced faded into the darkness of the tunnel’s middle and then the darkness of the tunnel’s middle gave way to the dimness of the tunnel’s exit, and then I was back in the brightness of the day again, appreciating it more now that I had left it and returned. Even now, whenever I hear the term “light at the end of the tunnel,” that is the tunnel I remember; that is the light I see.
A lot of my other earliest underground experiences happened in my imagination. On long car rides, I would imagine that every part of the passing scenery was just the tip of a gargantuan monster that lay asleep just below the surface of the Earth. Lampposts were the periscopes of enormous robots, trees were the up-pointed noses of slumbering trolls, walls were the long dorsal fins of dinosaurs sleeping with their backs to the sky. Watching out the window, I would imagine these dormant behemoths finally waking up. Cracks in the ground would open up around them as they emerged, limb by limb, the way my cousin Julius did after we covered him in sand at the beach. Here a robotic hand would emerge, its rivets caked with dirt. There pedestrians would shriek as they saw a troll’s head emerge from beneath a pine tree. Here a Godzilla-esque lizard would shake cars off his back the way a wet dog shakes off water. I never got far enough to see the creatures do anything with their size. No building stamped on, no battles fought, no armies held at bay. But in the germ of this fantastical game was the underlying sense that underground, right beneath our feet undiscovered mysteries lie hidden.
Will Hunt, whose profound book Underground I’ve enlisted as my guide to the underworld, writes, “Natural selection has designed us—in every way imaginable, from our metabolic needs, to the lattice-like anatomy of our eyes, to the deep, jellied structures of our brain—to stay on the surface, to not go underground.” And yet we go anyway. The allure of the underground is the chance to go exploring not at the distant edges of the map, but while staying right where you are. The chance to visit a place so utterly different from your own that they would have nothing in common if they didn't just so happen to be the same place. After being underground, I feel that I have an inside joke with the city itself that those who've remained on the surface aren’t in on. Will Hunt writes of his intimacy with New York, "Down in sunken alleys, I enjoyed seeing textures of the city that were invisible to people on the surface—ancient graffiti tags, cracks in the foundations of skyscrapers, exotic molds creeping over walls, decades-old newspapers crumpled in hidden crevices. New York and I shared secrets: I was sifting through hidden drawers, reading private letters."
On a cave tour in Iceland, our tour guide told us how when you find someone who’s stuck in a cave your job is to give them instructions for how to get themselves out. If the person stuck is a woman, you’re supposed to use a fatherly, authoritative voice. If the person stuck is a man, you’re supposed to use a coaxing, motherly voice. She didn’t mention how to speak to nonbinary folks. She did say, though, that men get stuck more often because we tend to be larger and a bit more brash. 
There was something mischievous about her smile when she told us, “I am about to turn off the light so that you can experience total cave darkness.” It felt like total cave darkness was an eccentric aunt who she wanted to introduce us to. I was eager to meet her. To go your whole life without “seeing” total cave darkness would be like never seeing the ocean. When she turned off the light the cave turned on its darkness. No one spoke in the same way no one speaks during prayers in a church. I blinked and registered no change. Eyes opened or closed, I saw the same thing. While the flashlight had been on, I had the feeling of being in a group. There were at least 15 or 20 of us on the tour. But when the light went out, it took the other people with it. Philosophers bat around the idea of solipsism—that we are all marooned on the islands of ourselves, unable to prove once and for all that anyone else exists. Alone in the universe. Standing silent in total cave darkness, it is not a theory. It’s a reality. But at this moment of total isolation, you’ve actually come across one of the few human experiences that millenia have done nothing to alter. The utter darkness I saw in that cave is the same darkness the mathematician and philosopher Pythagoras saw went he descended a cave to discover Hades. The same darkness that Mayan peoples offered sacrifices of precious pottery to. The same darkness that the scientist Michel Siffre saw in his two month long sensory deprivation study. The same darkness that indigenous Australian have been visiting for hundred of years to mine sacred ochre from. The same darkness that the Lakota of the Black Hills believe the first humans emerged out of. This is the place humans across history have gone to be away from places. It satisfies our, “eternal desire to connect with what we cannot see.” Where our vision no longer serves us, our minds start to take over. All day we have our eyes feeding reality to us, overshadowing our other senses—what happens to us when you remove it? It submerges you not in your senses, but in your mind. 
They give what all void gives which is the chance, no, the challenge to look deeper into your mind because they offer no escape from it into the distractions of vision. That the deepest vision you can find is no vision; the most powerful experience of sight is to not see. Fitzgerald wrote, “The strongest guard is placed at the gateway to nothing. Maybe because the condition of emptiness is too shameful to be divulged.” What happens when you slip past those guards? You see that the buried treasure down in the depths of the cave is no treasure at all, is the chance to content with emptiness and that is the wonder, the boon, the loot, the revelation you must bring back with you into the light.
`;

const fullText = newText;
const EventStage = {
  HASNOTBEGUN: 1,
  BEGUN: 2,
  FINISHED: 3
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Chthonic',
      fullText: newText,
      textIndexNumber: 3,
      fullTextArray: fullText.split(' '),
      textPresented: explanatoryText,
      firstBackwardsStatus: EventStage.HASNOTBEGUN,
      fontSize: 62,
      rotateStatus: EventStage.HASNOTBEGUN,
      rotate: 0,
      backgroundColor: '#fff',
      fontColor: 'black'
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('touchstart', this.handleTouchDown);
  }

  returnTextToPresent(fullTextArray, textIndexNumber) {
    let toReturn = '';
    for (let i = 0; i < textIndexNumber; i++) {
      toReturn += fullTextArray[i] + ' ';
    }

    return toReturn;
  }

  // DecreaseSize() {
  //     if (this.state.rotateStatus === EventStage.HASNOTBEGUN && this.state.textIndexNumber > 80) {
  //         this.setState({ rotateStatus: EventStage.BEGUN });
  //     } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber < 120) {
  //         this.setState({ fontSize: this.state.fontSize - 1 });
  //     } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber > 120) {
  //         this.setState({ rotateStatus: EventStage.FINISHED });
  //         this.setState({ fontSize: 62 });
  //     }
  // }

  /*
      rotateText() {
        if (this.state.rotateStatus === EventStage.HASNOTBEGUN && this.state.textIndexNumber > 120) {
          this.setState({rotateStatus: EventStage.BEGUN});
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber < 150) {
          this.setState({rotate: this.state.rotate + 1});
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber > 150) {
          this.setState({rotateStatus: EventStage.FINISHED});
        } else if (this.state.rotateStatus === EventStage.FINISHED && this.state.textIndexNumber > 150) {
          if (this.state.rotate > 0) {
            this.setState({rotate: this.state.rotate - 1});
          }
        }
      }
    */
  changeBackgroundBrightness() {
    if (this.state.textIndexNumber > 194 && this.state.textIndexNumber < 260) {
      const newBackgroundShade = tinycolor(this.state.backgroundColor).darken(1).toHexString();
      this.setState({backgroundColor: newBackgroundShade});
      const newFontShade = tinycolor(this.state.fontColor).lighten(1).toHexString();
      this.setState({fontColor: newFontShade});
    } else if (this.state.textIndexNumber > 1315) {
      const newBackgroundShade = tinycolor(this.state.backgroundColor).lighten(1).toHexString();
      this.setState({backgroundColor: newBackgroundShade});
      const newFontShade = tinycolor(this.state.fontColor).darken(1).toHexString();
      this.setState({fontColor: newFontShade});
    }
  }

  handleTouchDown(e) {
    if ((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 6340)) {
      this.subtractWord(e);
      this.setState({firstBackwardsStatus: EventStage.BEGUN});
    } else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 5970)) {
      this.setState({firstBackwardsStatus: EventStage.FINISHED});
    } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
      this.subtractWord(e);
    } else {
      this.addWord(e);
    }
  }

  handleKeyDown(e) {
    this.changeBackgroundBrightness();
    if ((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 6340)) {
      this.subtractWord(e);
      this.setState({firstBackwardsStatus: EventStage.BEGUN});
    } else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 5970)) {
      this.setState({firstBackwardsStatus: EventStage.FINISHED});
    } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
      this.subtractWord(e);
    } else {
      this.addWord(e);
    }
  }

  addWord(e) {
    if (e.type === 'touchstart') {
      if (this.state.fullTextArray.length > this.state.textIndexNumber) {
        this.setState(previousState => ({textIndexNumber: previousState + 1}));
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
        if (this.state.rotateStatus !== EventStage.BEGUN) {
          window.scrollBy(0, 5);
        }
      }
    }

    window.addEventListener('keydown', e => {
      if (e.keyCode === 32) {
        window.scrollBy(0, 250);
      }

      return !(e.keyCode === 32);
    });

    if (e.keyCode === 219) {
      const x = document.querySelectorAll('.fullStatistic');
      console.log(x[0].style);
      if (x[0].style.visibility === 'visible') {
        x[0].style.visibility = 'hidden';
      } else {
        x[0].style.visibility = 'visible';
      }
    }

    if (e.keyCode === 16) {
      window.scrollBy(0, 150);
    }

    if (e.keyCode === 221) {
      if (this.state.textPresented === this.state.fullText) {
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
      } else {
        this.setState(previousState => ({textPresented: previousState.fullText}));
      }
    }

    if (e.keyCode === 37) {
      console.log(e);
      if (this.state.textIndexNumber > 0) {
        this.setState(previousState => ({textIndexNumber: previousState.textIndexNumber - 1}));
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
        window.scrollBy(0, -2);
      }
    } else if (e.keyCode === 8) {
      const newArray = this.state.fullTextArray.slice(this.state.textIndexNumber, this.state.fullTextArray.length);
      this.setState({fullTextArray: newArray});
      this.setState({textPresented: ''});
      this.setState({textIndexNumber: 2});
      window.scrollTo(0, 0);
    } else if ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode === 39 || e.keyCode === 222 || (e.keyCode > 185 && e.keyCode < 192)) {
      if (this.state.fullTextArray.length > this.state.textIndexNumber) {
        this.setState(previousState => ({textIndexNumber: previousState.textIndexNumber + 1}));
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
        if (this.state.rotateStatus !== EventStage.BEGUN) {
          window.scrollBy(0, 10);
        }
      }
    }
  }

  subtractWord(e) {
    if (e.type === 'touchstart') {
      if (this.state.fullTextArray.length > this.state.textIndexNumber) {
        this.setState(previousState => ({textIndexNumber: previousState.textIndexNumber - 1}));
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
      }
    }

    window.addEventListener('keydown', e => {
      if (e.keyCode === 32) {
        window.scrollBy(0, 75);
      }

      return !(e.keyCode === 32);
    });

    if (e.keyCode === 219) {
      const x = document.querySelectorAll('.fullStatistic');
      console.log(x[0].style);
      if (x[0].style.visibility === 'visible') {
        x[0].style.visibility = 'hidden';
      } else {
        x[0].style.visibility = 'visible';
      }
    }

    if (e.keyCode === 16) {
      window.scrollBy(0, 150);
    }

    if (e.keyCode === 221) {
      if (this.state.textPresented === this.state.fullText) {
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
      } else {
        this.setState(previousState => ({textPresented: previousState.fullText}));
      }
    }

    if (e.keyCode === 37) {
      if (this.state.textIndexNumber > 0) {
        this.setState(previousState => ({textIndexNumber: previousState.textIndexNumber - 1}));
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
        window.scrollBy(0, -2);
      }
    } else if (e.keyCode === 8) {
      const newArray = this.state.fullTextArray.slice(this.state.textIndexNumber, this.state.fullTextArray.length);
      this.setState({fullTextArray: newArray});
      this.setState({textPresented: ''});
      this.setState({textIndexNumber: 2});
      window.scrollTo(0, 0);
    } else if ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode === 39 || e.keyCode === 222 || (e.keyCode > 185 && e.keyCode < 192)) {
      if (this.state.fullTextArray.length > this.state.textIndexNumber) {
        this.setState(previousState => ({textIndexNumber: previousState.textIndexNumber - 1}));
        this.setState(previousState => ({textPresented: this.returnTextToPresent(previousState.fullTextArray, previousState.textIndexNumber)}));
      }
    }
  }

  render() {
    return (
      <Controller vertical={false}>
        <Scene>
          <div>

            <header className="App-header" style={{backgroundColor: this.state.backgroundColor}}>
              <br/>
              <br/>
              <br/>

              <h1 className="title" style={{color: this.state.fontColor}}> {this.state.title} </h1>

              <Container className="container" style={{transform: 'rotate(' + this.state.rotate + 'deg)', color: this.state.fontColor}}>
                {this.state.textPresented}
              </Container>

              <Statistic className="fullStatistic" style={{color: this.state.fontColor}}>
                <Statistic.Value> <span className="stat"> {this.state.textIndexNumber}</span> <span className="stat">/</span> <span className="stat"> {this.state.fullTextArray.length} </span>  </Statistic.Value>
                <Statistic.Label> <span className="stat"> Words </span></Statistic.Label>
              </Statistic>

            </header>

          </div>
        </Scene>
      </Controller>

    );
  }
}
export default Home;
