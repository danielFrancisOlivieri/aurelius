
import React from 'react';
import { Container, Statistic } from 'semantic-ui-react';
import { Controller, Scene } from 'react-scrollmagic';
import 'semantic-ui-css/semantic.min.css';
import './legible.css';

let explanatoryText = `Start typing to begin. Press space to scroll down.`

let newText = `
Can you remember your first underground tunnel? Was it a subway? A cave? A catacomb? Mine was a concrete pipe that the local creek ran through. It was tame as tunnels go. It had no twists, no turns, no trap doors or criminals hiding from the law. Even so, it was my introduction to the world inside the world. You had to spread your legs out to either side of the pipe to avoid getting your feet wet. I remember the experience as a palindrome: first it was bright because I was outside the tunnel. Then it got darker and darker with each step. Then it started to get brighter again. And then it was back in the light. Whenever I hear the term "light at the end of the tunnel" that's the tunnel that I think of, that's the light that I see. 
	To me, the allure of the underground is the chance to explore not some new far away place, but the hidden depths of the world you thought you knew. After visiting the catacombs of Valletta or the tunnel system under Exeter, I always feel like I have an inside joke with the city. I can never remember street names, even in Philadelphia I mix up Walnut street with Chestnut street with Market street. I can never remember it’s public personality. I've met it in private and seen its secrets. Let's take Exeter for example. Standing in a tunnel that once brought water to 14th century monks, I get a thrill when the tour guide tells us that we're right underneath High street. I knew High Street. I walked down it several days a week. Somewhere above us copies of Homo Deus were on sale at Waterstones, the automatic doors of the grocery store were sliding open and closed, my friends were at a coffee shop working on essays. That upper Exeter seemed to have nothing whatsoever to do with this lower one. The thing, though, was that if you were to plot these two locations on a map, you'd have to plot the same point. These were two utterly different places bound only by the odd chance that they happened to be the same place. This gave me the uncanny sensation that I wasn’t touring the city’s history, but its subconscious. 
	As a kindergartener, I loved watching the class ant farm. It allowed me not a simple overhead bird's eye view of ants, but a God's eye view that allowed me to see them not only from above, but also every twist and turn of every tunnel, every inlet, and every ant all at once. This is the relationship I would prefer to have with caves. However, as we have yet to seal a full sized cave system in glass and put it on display, I have to content myself with maps. There's plenty to be content with. Looking at a map of a cave system feels like looking at an abstract painting done by geology itself. Rainwater cuts its way down through fissures in rock while sulfuric water from aquifers pushes its way up. Volcanoes have their own style of cave sculpting too: lava often leaves behind tubular tunnels near the surface of the Earth. But the main reason I would rather explore a map of a cave rather than the cave itself is that its difficult for a map to kill you. Just as it would be difficult to drown in a map of the Pacific ocean, it’s equally unlikely that you’ll get caught in a map of a cave system.
There was something mischievous about her smile when our tour guide told us that she was going to turn off the light. It felt like total cave darkness was an eccentric aunt who she wanted to introduce us to. I was eager to meet her. To go your whole life without “seeing” total cave darkness would be like never seeing the ocean. She turned off the light and the cave turned on its darkness. No one spoke in the same way no one speaks during prayers in a church. I blinked and registered no change. Eyes opened or closed, I saw the same thing: darkness. While the flashlight had been on, I had the feeling of being in a group. There were at least 15 or 20 of us on the tour. But when the light went out, it took the other people with it. Philosophers bat around the idea of solipsism. Of brains in vats just thinking so that there’s nothing to the world but thought. Standing silent in total cave darkness, it is not a theory—it’s a reality. But at this moment of total isolation, you’ve actually come across one of the oldest human experiences the world has to offer. The utter darkness I saw in that cave is the same darkness Pythagoras saw went he descended a cave to discover Hades and that the scientist Michel Siffre saw in his two month long sensory deprivation study, which is the same darkness that the earliest humans saw as they scuttled through tunnels, avoiding cave bears. There is something mystical in caves like this, in experiences in the dark zone. As the writer Will Hunt puts it, caves satisfy our, “eternal desire to connect with what we cannot see.” 
`
let fullText = newText;
const EventStage = {
    HASNOTBEGUN: 1,
    BEGUN: 2,
    FINISHED: 3
}

export class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            title: 'Depth',
            fullText: newText,
            textIndexNumber: 3,
            explanationTextStatus: true,
            fullTextArray: fullText.split(' '),
            textPresented: explanatoryText,
            modalActivated: false,
            firstBackwardsStatus: EventStage.HASNOTBEGUN,
            fontSize: 62,
            rotateStatus: EventStage.HASNOTBEGUN,
            rotate: 0,
            
        }

    }

      componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('touchstart', this.handleTouchDown);
        
      }

      returnTextToPresent = (fullTextArray, textIndexNumber) => {       
        let toReturn = '';
        for (let i = 0; i < textIndexNumber; i++) {
            toReturn += fullTextArray[i] + ' ';
        }
        return toReturn;
    }

    decreaseSize = () => {

        if(this.state.rotateStatus === EventStage.HASNOTBEGUN && this.state.textIndexNumber > 80) {
            this.setState({rotateStatus: EventStage.BEGUN});
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber < 120) {
            this.setState({fontSize: this.state.fontSize - 1 })
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber > 120) {
            this.setState({rotateStatus: EventStage.FINISHED});
            this.setState({fontSize: 62 })
        }

    } 

    rotateText = () => {

        if(this.state.rotateStatus === EventStage.HASNOTBEGUN && this.state.textIndexNumber > 120) {
            this.setState({rotateStatus: EventStage.BEGUN});
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber < 150) {
            this.setState({rotate: this.state.rotate + 1 })
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber > 150) {
            this.setState({rotateStatus: EventStage.FINISHED});
        } else if (this.state.rotateStatus === EventStage.FINISHED && this.state.textIndexNumber > 150) {
            if (this.state.rotate > 0 ) {
                this.setState({rotate: this.state.rotate - 1 })
            }
        }


    } 

    handleTouchDown = (e) => {
        this.addWord(e);
        // if((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 25)) {
        //   this.subtractWord(e);
        //   this.setState({firstBackwardsStatus: EventStage.BEGUN});
        // }  else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 7)) {
        //   this.setState({firstBackwardsStatus: EventStage.FINISHED});
        // } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
        //   this.subtractWord(e);
        // } else {
        //     this.addWord(e);
        // }
    }

      handleKeyDown = (e) => {

        this.addWord(e);

        //   if((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 25)) {
        //     this.subtractWord(e);
        //     this.setState({firstBackwardsStatus: EventStage.BEGUN});
        //   }  else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 7)) {
        //     this.setState({firstBackwardsStatus: EventStage.FINISHED});
        //   } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
        //     this.subtractWord(e);
        //   } else {
        //       this.addWord(e);
        //   }

      }

      addWord = (e) => {

        if(e.type === 'touchstart') {
            if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                this.setState({textIndexNumber: this.state.textIndexNumber + 1});
                this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
               if (this.state.rotateStatus !== EventStage.BEGUN) {
                window.scrollBy(0, 5);
               }
                
              }
        }

            window.onkeydown = function(e) { 
            
                if(e.keyCode === 32) {
                    window.scrollBy(0, 250);    
                }
                return !(e.keyCode === 32);
            };
    
            if (e.keyCode === 219) {
                let x = document.getElementsByClassName("fullStatistic");
                console.log(x[0].style);
                if (x[0].style.visibility === 'visible') {
                    x[0].style.visibility = 'hidden';
                } 
                else {
                    x[0].style.visibility = 'visible';
                }
                
            }
    
            if(e.keyCode === 16) {
                window.scrollBy(0, 150);
            }
    
            if (e.keyCode === 221) {
                if ( this.state.textPresented === this.state.fullText) {
                    this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                }
                else {
                    this.setState({textPresented: this.state.fullText});
                }
                
            }
    
            if(e.keyCode === 37 ) {
                console.log(e);
                if ( this.state.textIndexNumber > 0 ) {
                    this.setState({textIndexNumber: this.state.textIndexNumber - 1});
                    this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                    window.scrollBy(0, -2);
                }           
            } else if (e.keyCode === 8) {
                let newArray = this.state.fullTextArray.slice(this.state.textIndexNumber, this.state.fullTextArray.length);
                this.setState({fullTextArray: newArray});
                this.setState({textPresented: '' });
                this.setState({textIndexNumber: 2 });
                window.scrollTo(0,0);
            } else if ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode === 39 || e.keyCode === 222 || (e.keyCode > 185 && e.keyCode < 192) ){
                if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                    this.setState({textIndexNumber: this.state.textIndexNumber + 1});
                    this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                   if (this.state.rotateStatus !== EventStage.BEGUN) {
                    window.scrollBy(0, 10);
                   }
                    
                  }
            }

        
            
      }

      subtractWord = (e) => {
        
        
        if(e.type === 'touchstart') {
            if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                this.setState({textIndexNumber: this.state.textIndexNumber - 1});
                this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
               
                
              }
        }

            window.onkeydown = function(e) { 
            
                if(e.keyCode === 32) {
                    window.scrollBy(0, 75);    
                }
                return !(e.keyCode === 32);
            };
    
            if (e.keyCode === 219) {
                let x = document.getElementsByClassName("fullStatistic");
                console.log(x[0].style);
                if (x[0].style.visibility === 'visible') {
                    x[0].style.visibility = 'hidden';
                } 
                else {
                    x[0].style.visibility = 'visible';
                }
    
                
            }
    
            if(e.keyCode === 16) {
                window.scrollBy(0, 150);
            }
    
            if (e.keyCode === 221) {
                if ( this.state.textPresented === this.state.fullText) {
                    this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                }
                else {
                    this.setState({textPresented: this.state.fullText});
                }
                
            }
    
            if(e.keyCode === 37 ) {
                console.log(e);
                if ( this.state.textIndexNumber > 0 ) {
                    this.setState({textIndexNumber: this.state.textIndexNumber - 1});
                    this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                    window.scrollBy(0, -2);
                }           
            } else if (e.keyCode === 8) {
                let newArray = this.state.fullTextArray.slice(this.state.textIndexNumber, this.state.fullTextArray.length);
                this.setState({fullTextArray: newArray});
                this.setState({textPresented: '' });
                this.setState({textIndexNumber: 2 });
                window.scrollTo(0,0);
            } else if ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode === 39 || e.keyCode === 222 || (e.keyCode > 185 && e.keyCode < 192) ){
                if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                    this.setState({textIndexNumber: this.state.textIndexNumber - 1});
                    this.setState({textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                  
                
                  }
            }


        
      }


    render() {
        return (
            <Controller vertical={false}  >
                    <Scene>
            <div>

                <header className="App-header"  >

                    <h1 className='title' > {this.state.title} </h1>
                    
                    <Container className='container' style={{"transform": 'rotate(' + this.state.rotate + 'deg)'  }}  >                   
                      
                      {this.state.textPresented}
</Container>

<Statistic className='fullStatistic' >
    <Statistic.Value> <span className='stat'> {this.state.textIndexNumber}</span> <span className='stat'>/</span> <span className='stat'> {this.state.fullTextArray.length} </span>  </Statistic.Value>
    <Statistic.Label> <span className='stat'> Words </span></Statistic.Label>
  </Statistic>

                </header>

            </div>
            </Scene>
</Controller>

        );
    }

}
export default Home;