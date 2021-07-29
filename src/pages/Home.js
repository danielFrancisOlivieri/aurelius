
import React from 'react';
import { Container, Statistic } from 'semantic-ui-react';
import { Controller, Scene } from 'react-scrollmagic';
import 'semantic-ui-css/semantic.min.css';
import './legible.css';

let explanatoryText = `Start typing to begin. Press space to scroll down.`

let newText = `
Can you remember your first underground tunnel? The bulkhead steps that were covered with spiderwebs? the grandparent’s wine cellar? the New York subway system? Mine was a concrete pipe that the local creek ran through. At the other end of the creek, my friend Jackson and I spent afternoons leading toy army men in amphibious assaults along its banks. Bazookas fired, machine guns rattled, an infantry corporal called in for air support. But at the other end from where we played, the creek fed into an imposing tunnel which seemed to have its own private night going throughout all hours of the day. Emily, Jackson’s older sister, always stole the hair off my Playmobil figures to annoy me. She had the idea of walking through the tunnel. More scary than the tunnel was being the only one too afraid to go into the tunnel. The creek ran through the bottom of it so you had to spread your legs out to either side to avoid it. It was tame as tunnels go. It had no twists, no turns, no trap doors or criminals hiding from the law. I remember the experience as a palindrome: the brightness of the day faded into the dimness of the tunnel’s entrance and the tunnel’s entranced faded into the darkness of the tunnel’s middle and then the darkness of the tunnel’s middle gave way to the dimness of the tunnel’s exit, and then I was back in the brightness of the day again, appreciating it more now that I had left it and returned. Even now, whenever I hear the term “light at the end of the tunnel,” that is the tunnel I remember; that is the light I see.
A lot of my earliest underground experiences happened in my imagination. On long car rides, I would imagine that every part of the passing scenery was just the tip of a gargantuan monster that lay asleep just below the surface of the Earth. Lampposts were the periscopes of enormous robots, trees were the up-pointed noses of slumbering trolls, walls were the long dorsal fins of dinosaurs sleeping with their backs to the sky. Watching out the window, I would imagine these dormant behemoths finally waking up. Cracks in the ground would open up around them as they emerged, limb by limb, the way my cousin Julius did after we covered him in sand at the beach. Here a robotic hand would emerge, its rivets caked with dirt. There pedestrians would shriek as they saw a troll’s head emerge from beneath a pine tree. Here a Godzilla-esque lizard would shake cars off his back the way a wet dog shakes off water. I never got far enough to see the creatures do anything with their size. No building stamped on, no battles fought, no armies held at bay. But in the germ of this fantastical game was the underlying sense that underground, right beneath our feet undiscovered power and mystery lies hidden.
The allure of the underground is the chance to go exploring not at the distant edges of the map, but while staying right where you are. The chance to visit a place so utterly different from your own that they would have nothing in common if they didn't just so happen to be the same place: if you wanted to point to them on the map, you'd have to point to the same spot. After being underground, I feel that I have an inside joke with the city itself that those who've remained on the surface aren’t in on. The writer Will Hunt, whose profound book Underground is the basis for this essay, writes of his intimacy with New York, "Down in sunken alleys, I enjoyed seeing textures of the city that were invisible to people on the surface—ancient graffiti tags, cracks in the foundations of skyscrapers, exotic molds creeping over walls, decades-old newspapers crumpled in hidden crevices. New York and I shared secrets: I was sifting through hidden drawers, reading private letters."
On a cave tour in Iceland, our tour guide told us how when you find someone who’s stuck in a cave your job is to give them instructions for how to get themselves out. If the person stuck is a woman, you’re supposed to use a fatherly, authoritative voice. If the person stuck is a man, you’re supposed to use a coaxing, motherly voice. She didn’t mention how to speak to nonbinary folks. She did say, though, that men get stuck more often because we tend to be larger and a bit more brash. 
There was something mischievous about her smile when our tour guide told us that she was going to turn off the light. It felt like total cave darkness was an eccentric aunt who she wanted to introduce us to. I was eager to meet her. To go your whole life without “seeing” total cave darkness would be like never seeing the ocean. She turned off the light and the cave turned on its darkness. No one spoke in the same way no one speaks during prayers in a church. I blinked and registered no change. Eyes opened or closed, I saw the same thing. While the flashlight had been on, I had the feeling of being in a group. There were at least 15 or 20 of us on the tour. But when the light went out, it took the other people with it. Philosophers bat around the idea of solipsism. Of brains in vats just thinking so that there’s nothing to the world but thought. Standing silent in total cave darkness, it is not a theory, it’s a reality. But at this moment of total isolation, you’ve actually come across one of the oldest human experiences the world has to offer. The utter darkness I saw in that cave is the same darkness Pythagoras saw went he descended a cave to discover Hades, that the scientist Michel Siffre saw in his two month long sensory deprivation study, which is the same darkness that the earliest humans saw as they scuttled through tunnels, avoiding cave bears. There is something mystical in caves like this, in experiences in the dark zone. As the writer Will Hunt puts it, caves satisfy our, “eternal desire to connect with what we cannot see.” 
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
            title: 'Chthonic',
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
        console.log(fullTextArray);
        let toReturn = '';
        for (let i = 0; i < textIndexNumber; i++) {
            toReturn += fullTextArray[i] + ' ';
        }
        return toReturn;
    }

    decreaseSize = () => {

        if (this.state.rotateStatus === EventStage.HASNOTBEGUN && this.state.textIndexNumber > 80) {
            this.setState({ rotateStatus: EventStage.BEGUN });
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber < 120) {
            this.setState({ fontSize: this.state.fontSize - 1 })
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber > 120) {
            this.setState({ rotateStatus: EventStage.FINISHED });
            this.setState({ fontSize: 62 })
        }

    }

    rotateText = () => {

        if (this.state.rotateStatus === EventStage.HASNOTBEGUN && this.state.textIndexNumber > 120) {
            this.setState({ rotateStatus: EventStage.BEGUN });
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber < 150) {
            this.setState({ rotate: this.state.rotate + 1 })
        } else if (this.state.rotateStatus === EventStage.BEGUN && this.state.textIndexNumber > 150) {
            this.setState({ rotateStatus: EventStage.FINISHED });
        } else if (this.state.rotateStatus === EventStage.FINISHED && this.state.textIndexNumber > 150) {
            if (this.state.rotate > 0) {
                this.setState({ rotate: this.state.rotate - 1 })
            }
        }

    }

    handleTouchDown = (e) => {
        if ((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 634)) {
            this.subtractWord(e);
            this.setState({ firstBackwardsStatus: EventStage.BEGUN });
        } else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 597)) {
            this.setState({ firstBackwardsStatus: EventStage.FINISHED });
        } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
            this.subtractWord(e);
        } else {
            this.addWord(e);
        }
    }

    handleKeyDown = (e) => {
        if ((this.state.firstBackwardsStatus === EventStage.HASNOTBEGUN) && (this.state.textIndexNumber > 634)) {
            this.subtractWord(e);
            this.setState({ firstBackwardsStatus: EventStage.BEGUN });
        } else if ((this.state.firstBackwardsStatus === EventStage.BEGUN) && (this.state.textIndexNumber < 597)) {
            this.setState({ firstBackwardsStatus: EventStage.FINISHED });
        } else if (this.state.firstBackwardsStatus === EventStage.BEGUN) {
            this.subtractWord(e);
        } else {
            this.addWord(e);
        }

    }

    addWord = (e) => {

        if (e.type === 'touchstart') {
            if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                this.setState({ textIndexNumber: this.state.textIndexNumber + 1 });
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                if (this.state.rotateStatus !== EventStage.BEGUN) {
                    window.scrollBy(0, 5);
                }

            }
        }

        window.onkeydown = function (e) {

            if (e.keyCode === 32) {
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

        if (e.keyCode === 16) {
            window.scrollBy(0, 150);
        }

        if (e.keyCode === 221) {
            if (this.state.textPresented === this.state.fullText) {
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
            }
            else {
                this.setState({ textPresented: this.state.fullText });
            }

        }

        if (e.keyCode === 37) {
            console.log(e);
            if (this.state.textIndexNumber > 0) {
                this.setState({ textIndexNumber: this.state.textIndexNumber - 1 });
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                window.scrollBy(0, -2);
            }
        } else if (e.keyCode === 8) {
            let newArray = this.state.fullTextArray.slice(this.state.textIndexNumber, this.state.fullTextArray.length);
            this.setState({ fullTextArray: newArray });
            this.setState({ textPresented: '' });
            this.setState({ textIndexNumber: 2 });
            window.scrollTo(0, 0);
        } else if ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode === 39 || e.keyCode === 222 || (e.keyCode > 185 && e.keyCode < 192)) {
            if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                this.setState({ textIndexNumber: this.state.textIndexNumber + 1 });
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                if (this.state.rotateStatus !== EventStage.BEGUN) {
                    window.scrollBy(0, 10);
                }

            }
        }

    }

    subtractWord = (e) => {
        if (e.type === 'touchstart') {
            if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                this.setState({ textIndexNumber: this.state.textIndexNumber - 1 });
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
            }
        }

        window.onkeydown = function (e) {

            if (e.keyCode === 32) {
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

        if (e.keyCode === 16) {
            window.scrollBy(0, 150);
        }

        if (e.keyCode === 221) {
            if (this.state.textPresented === this.state.fullText) {
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
            }
            else {
                this.setState({ textPresented: this.state.fullText });
            }

        }

        if (e.keyCode === 37) {
            console.log(e);
            if (this.state.textIndexNumber > 0) {
                this.setState({ textIndexNumber: this.state.textIndexNumber - 1 });
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
                window.scrollBy(0, -2);
            }
        } else if (e.keyCode === 8) {
            let newArray = this.state.fullTextArray.slice(this.state.textIndexNumber, this.state.fullTextArray.length);
            this.setState({ fullTextArray: newArray });
            this.setState({ textPresented: '' });
            this.setState({ textIndexNumber: 2 });
            window.scrollTo(0, 0);
        } else if ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode === 39 || e.keyCode === 222 || (e.keyCode > 185 && e.keyCode < 192)) {
            if (this.state.fullTextArray.length > this.state.textIndexNumber) {
                this.setState({ textIndexNumber: this.state.textIndexNumber - 1 });
                this.setState({ textPresented: this.returnTextToPresent(this.state.fullTextArray, this.state.textIndexNumber) });
            }
        }
    }

    render() {
        return (
            <Controller vertical={false}  >
                <Scene>
                    <div>

                        <header className="App-header"  >
                            <br />
                            <br />
                            <br />

                            <h1 className='title' > {this.state.title} </h1>

                            <Container className='container' style={{ "transform": 'rotate(' + this.state.rotate + 'deg)' }}  >

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