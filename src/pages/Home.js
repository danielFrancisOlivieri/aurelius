
import React from 'react';
import { Container, Statistic } from 'semantic-ui-react';
import { Controller, Scene } from 'react-scrollmagic';
import 'semantic-ui-css/semantic.min.css';
import './legible.css';


let newText = `
Can you remember your first tunnel? Any tunnel will do. Crawlspaces, unexpected corridors, subways, cellars, bulkheads, catacombs.
Mine is from the day we tried to clean up Narbrook park. It helped that Narbrook park was pretty clean to begin with. 
Ever since, whenever I hear "Light at the end of the tunnel," that is the light I see, that is the tunnel I remember. 
Emily Red behind me urging me to go faster. My legs spread out on either side to avoid the trail of water running through the middle. 
Tunnel systems fan out under the Earth in harrowing displays. That you might just be at the surface of your life. 
Depths. The metaphors that bind the world together. A way to talk about what you can't see. What does it mean to have depth? 
Can you remember a second tunnel? A tunnel of your adolescents? 
Now I'm asking you for a different type of tunnel. Not a tunnel but what feels like a tunnel. 
Anything that has you trapped and pushing through. No way out but forward.  
If you find a woman who's caught in a cave, you use a father's authoritative tone. 
If you fnd a man (who tend to get stuck a bit more often, being bulkier and more foolhardy) you use a coaxing, motherly tone.

`

let title = 'Tunnels';
let textIndexNumber = 2; // holds your place, manipulating it changes how much is presented
let fullText = newText;
let fullTextArray = fullText.split(' ');
const GoBackwardsStage = {
    HASNOTBEGUN: 1,
    BEGUN: 2,
    FINISHED: 3
}

function returnTextToPresent(fullTextArray, textIndexNumber) {
    let toReturn = '';
    for (let i = 0; i < textIndexNumber; i++) {
        toReturn += fullTextArray[i] + ' ';
    }
    return toReturn;
}


export class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            title: 'Title',
            fullText: newText,
            textIndexNumber: 2,
            fullTextArray: fullText.split(' '),
            textPresented: returnTextToPresent(fullTextArray, textIndexNumber),
            modalActivated: false,
            firstBackwardsStatus: GoBackwardsStage.HASNOTBEGUN
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

      componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
      }


      toggleModal() {
        this.setState({modalActivated: true});
        console.log('toggle modal');
      }

      handleKeyDown = (e) => {
          console.log(this.state.textIndexNumber);
          console.log(this.state.firstBackwardsStatus);
          if((this.state.firstBackwardsStatus === GoBackwardsStage.HASNOTBEGUN) && (this.state.textIndexNumber > 25)) {
            this.subtractWord(e);
            this.setState({firstBackwardsStatus: GoBackwardsStage.BEGUN});
          }  else if ((this.state.firstBackwardsStatus === GoBackwardsStage.BEGUN) && (this.state.textIndexNumber < 7)) {
            this.setState({firstBackwardsStatus: GoBackwardsStage.FINISHED});
          } else if (this.state.firstBackwardsStatus === GoBackwardsStage.BEGUN) {
            this.subtractWord(e);
          } else {
              this.addWord(e);
          }

      }

  
      addWord = (e) => {

        if (!this.state.modalActivated) {

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
                    this.setState({textPresented: returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                }
                else {
                    this.setState({textPresented: this.state.fullText});
                }
                
            }
    
            if(e.keyCode === 37 ) {
                console.log(e);
                if ( this.state.textIndexNumber > 0 ) {
                    this.setState({textIndexNumber: this.state.textIndexNumber - 1});
                    this.setState({textPresented: returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
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
                    this.setState({textPresented: returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                   window.scrollBy(0, 5);
                
                  }
            }

        }
            
      }

      subtractWord = (e) => {
        if (!this.state.modalActivated) {

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
                    this.setState({textPresented: returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                }
                else {
                    this.setState({textPresented: this.state.fullText});
                }
                
            }
    
            if(e.keyCode === 37 ) {
                console.log(e);
                if ( this.state.textIndexNumber > 0 ) {
                    this.setState({textIndexNumber: this.state.textIndexNumber - 1});
                    this.setState({textPresented: returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
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
                    this.setState({textPresented: returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                  
                
                  }
            }


        }
      }


    render() {
        return (
            <Controller vertical={false}  >
                    <Scene>
            <div>

                <header className="App-header"  >

                    <h1 className='title' > {title} </h1>
                    
                    <Container className='container' >                   

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