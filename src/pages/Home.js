
import React from 'react';
import { Container, Statistic } from 'semantic-ui-react';
import { Controller, Scene } from 'react-scrollmagic';
import 'semantic-ui-css/semantic.min.css';
import './legible.css';

let explanatoryText = `Start typing to begin. Press space to scroll down.`

let newText = `
Can you remember your first tunnel? 
Mine began with a creek. At the other end of the creek that we played at there was this dark tunnel that seemed like a black hole, like foreboding, placed there out of a horror story because it stood right next to the rest of the world but was so clearly an entrance to another one, the exact place where day turned to night, where it kept its own pocket of night going throughout the day. Emily, Jackson’s older sister, always stole the hair off my Playmobil figures to annoy me. She had the idea of walking through the tunnel. More scary than the tunnel was being the only one too afraid to go into the tunnel. The creek ran through the bottom of it so you had to spread your legs out to either side to avoid it. This was tame as tunnels go. It had no twists, no turns, no trap doors or criminals hiding from the law. Whenever I hear the term “light at the end of the tunnel,” that is the tunnel I remember; that is the light I see. There was no way out on the other side, unless you were prepared to swim. It was just water on the other side with walls on either side that were too tall to scale. There was no way out, but there was another perspective, the chance to see my same world from a different vantage point. Now I could look up on the world that before I’d only looked down from.
Language itself seems to think that knowledge lurks down below us. "Let's get to the bottom of this." "What's the fundamental problem here?" "You need to dig deeper into the problem."
"there is no trifle, there is no puzzle, but one design unites and animates the farthest pinnacle and the lowest trench."
Every depth it itself the surface of another layer that lies deeper still. 
The Earth has a long memory and what humans forget it often remembers. This--- total cave darkness is something that humans have encountered for the full 200,000 years of our existence. The eerie feeling of opening and closing one's eyes, but registering no difference. This is what total cave darkness means. There is no darker than total darkness. The cave darkness whether you are early man searching for a place to have your ritual or an ascetic monk looking to meet God in the darkness or the scientist who lived in total darkness for months to see what natural rhythm his body would adjust to when deprived of any access to light. 
`
let textIndexNumber = 3; // holds your place, manipulating it changes how much is presented
let fullText = newText;
let fullTextArray = fullText.split(' ');
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