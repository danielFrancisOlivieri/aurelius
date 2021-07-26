
import React from 'react';
import { Container, Statistic } from 'semantic-ui-react';
import { Controller, Scene } from 'react-scrollmagic';
import 'semantic-ui-css/semantic.min.css';
import './legible.css';

let explanatoryText = `Start typing to begin. Press space to scroll down.`

let newText = `
Can you remember your first underground tunnel? The bulkhead steps that were covered with spiderwebs, the grandparent’s wine cellar, the subway across the city. Mine began with a creek. It was the creek my friend Jackson and I would play army men on its banks and float makeshift toy boats down it. Downstream though, far from where we played, there was a tunnel the stream disappeared into. It seemed like a pocket of night tucked away underground. Emily was Jackson’s older sister and it was her idea to explore it. More scary than the tunnel was being the only one too afraid to go into the tunnel. The creek ran through the bottom of it so you had to spread your legs out to either side to avoid it. It was tame as tunnels go. It had no twists, no turns, no trap doors or criminals hiding from the law. Even now, whenever I hear the term “light at the end of the tunnel,” that is the tunnel I remember; that is the light I see.
The allure of the underground is the chance to go exploring not at the distant edges of the map, while staying right where you are. The chance to visit a place so utterly different from your own that they would have nothing in common if they didn't just so happen to be the same place. They have nothing in common except that if you wanted to point to them on the map, you'd have to point to the same place. After being underground, I feel that I have an inside joke with the city itself that those who've remained on the surface don't get. The writer Will Hunt, whose astonishing book "Underground" is the basis for this essay, writes of his intimacy with New York, "Down in sunken alleys, I enjoyed seeing textures of the city that were invisible to people on the surface—ancient graffiti tags, cracks in the foundations of skyscrapers, exotic molds creeping over walls, decades-old newspapers crumpled in hidden crevices. New York and I shared secrets: I was sifting through hidden drawers, reading private letters."
	To see the world the way I saw that ant colony: at a cross section, able to see every twist of the caverns, every inlet. This is the relationship I prefer to have with caves. I would generally prefer to explore the map of a cave rather than the cave itself. Maps of caves seem like abstract paintings drawn by geology itself, by volcanos, by lava floes, by glaciers, by the slow movement of the Earth. The other virtue of cave maps is that its difficult to get stuck in them, rare to accidentally get caught in a cave of a map, unlikely that a flash flood will fill up a chamber. Just as it would be difficult to drown in a map of the Pacific ocean, it’s equally unlikely that you’ll get caught in a map of a cave system. You also don’t have to pack yourself any granola bars, which is nice because I find them too sweet these days. 
There was something mischievous about her smile when she told us that she was going to turn off the light. It felt like total cave darkness was an eccentric who she wanted to introduce us to. I, for one, was glad to meet him. I blinked and registered no change. Eyes opened or closed, my vision was exactly the same. Except for their ability to keep out dust, my eyelids were momentarily obsolete. What's also interesting to me about that moment was that while her flashlight was on, we were there in a group. But the moment the lights went out, the other people disappeared with it. In that twenty seconds or so that she left the light off, I was as alone as I would ever be. Philosophers bat around the idea of solipsism. Alone in a cave, it is not a theory—this is it. Entirely alone in a cave, you are shut in on all sides, you are alone with your mind. 
Philosophers, economists, and historians don their professorial blazers with shoulder pads and march into the mine shafts every morning to go mine knowledge. There's Emeritus professor Mauck hammering away at poststructural theory, there's Adorno sifting through some water for nuggets of cultural theory, this right here is the mine shaft where Walter Benjamin hit the lode of facts that became the Work of Art in the Age of Mechanical Reproduction. Every depth that you hit is just the surface of another greater depth. This isn't totally wrong though: there are archaeologists and paleontologists and the Large Hadron collider.
Language itself seems to share this opinion; metaphors equating depth to knowledge are entrenched in our daily metaphors. “Let’s get to the bottom of this.” “How deep does this go?” This is a foundational idea. “That’s profound” profound comes from the Italian “profondo” meaning deep. 
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

        if((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 25)) {
          this.subtractWord(e);
          this.setState({firstBackwardsStatus: EventStage.BEGUN});
        }  else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 7)) {
          this.setState({firstBackwardsStatus: EventStage.FINISHED});
        } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
          this.subtractWord(e);
        } else {
            this.addWord(e);
        }
    }

      handleKeyDown = (e) => {

          if((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 25)) {
            this.subtractWord(e);
            this.setState({firstBackwardsStatus: EventStage.BEGUN});
          }  else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 7)) {
            this.setState({firstBackwardsStatus: EventStage.FINISHED});
          } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
            this.subtractWord(e);
          } else {
              this.addWord(e);
          }

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