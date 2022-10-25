function DrumPad (props) {

    /* In order to be able to use audio tracks in this project and upload a functional version of the app to codepen, 
    I have used the same audio sources as the ones in the example. This way the audio can be displayed with no problem. If codepen allowed to
    upload media material sucha as photos or music, different sources of audio would have been used.*/

    function prepareKeyboard() {
        document.addEventListener("keydown", function (event) {play(event, 2)})
    }

    const firstMode = [
        {
          keyCode: 81,
          keyTrigger: 'Q',
          id: 'Heater-1',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
        
        {
          keyCode: 87,
          keyTrigger: 'W',
          id: 'Heater-2',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
        
        {
          keyCode: 69,
          keyTrigger: 'E',
          id: 'Heater-3',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
        
        {
          keyCode: 65,
          keyTrigger: 'A',
          id: 'Heater-4',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
        
        {
          keyCode: 83,
          keyTrigger: 'S',
          id: 'Clap',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
        
        {
          keyCode: 68,
          keyTrigger: 'D',
          id: 'Open-HH',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
        
        {
          keyCode: 90,
          keyTrigger: 'Z',
          id: "Kick-n'-Hat",
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
        
        {
          keyCode: 88,
          keyTrigger: 'X',
          id: 'Kick',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
        
        {
          keyCode: 67,
          keyTrigger: 'C',
          id: 'Closed-HH',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];
        
    const secondMode = [
        {
          keyCode: 81,
          keyTrigger: 'Q',
          id: 'Chord-1',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
        
        {
          keyCode: 87,
          keyTrigger: 'W',
          id: 'Chord-2',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
        
        {
          keyCode: 69,
          keyTrigger: 'E',
          id: 'Chord-3',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
        
        {
          keyCode: 65,
          keyTrigger: 'A',
          id: 'Shaker',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
        
        {
          keyCode: 83,
          keyTrigger: 'S',
          id: 'Open-HH',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
        
        {
          keyCode: 68,
          keyTrigger: 'D',
          id: 'Closed-HH',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
        
        {
          keyCode: 90,
          keyTrigger: 'Z',
          id: 'Punchy-Kick',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
        
        {
          keyCode: 88,
          keyTrigger: 'X',
          id: 'Side-Stick',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
        
        {
          keyCode: 67,
          keyTrigger: 'C',
          id: 'Snare',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];

    const play = (event, mode) => {

      if (mode == 1 && props.power) {
        let item = event.target.children[0]
        item.volume = props.volume / 100
        item.play()
      } else {
        let item = document.getElementById(event['key'].toUpperCase())
        item.volume = props.volume / 100
        item.play()
      }
    }
        

    return <div id="buttons">

        {
            props.mode == 1 ? firstMode.map(content => {
                return <button key={content.keyCode} className="drum-pad" id={content.id} 
                onClick={(event) => {
                    play(event, 1)
                    props.power ? 
                    props.selectMelody(content):
                    ''
                }}
                onKeyPress={(event) => play(event, 2)}
                >{content.keyTrigger}

                    <audio src={content.url} className="clip" id={content.keyTrigger} volume={props.volume / 100}></audio>
                
                </button>
            }) : secondMode.map(content => {
                return <button key={content.keyCode} className="drum-pad" id={content.id} onClick={(event) => {
                    play(event, 1)
                    props.power ? 
                    props.selectMelody(content):
                    ''
                }}>{content.keyTrigger}

                    <audio src={content.url} className="clip" id={content.keyTrigger} volume={props.volume / 100}></audio>
                
                </button>
            })
        }
    
    </div>
}

function Control (props) {
    return <div id="control">
            <div id="change-power" className="control-items">
                <button className="btn" id="power" onClick={props.changePower}> Power </button>
            </div>
            <div id="display" className="control-items" innertext={props.power ? props.melodyDisplay : '' }>
                { props.power ? props.melodyDisplay : '' }
            </div>
            <div id="change-melody" className="control-items">
                <button className="btn" id="melody" onClick={props.changeMode}>{props.mode == 1 ? 'Mode A' : 'Mode B'}</button>
            </div>
            <div id="change-volume" className="control-items">
                <label htmlFor="volume">Volume</label>
                <input type="range" name="volume" id="volume" onChange={(event) => props.changeVolume(event)}></input>
            </div>
                
    </div>
}


function App () {

    const [power, setPower] = React.useState(true)
    const [mode, setMode] = React.useState(1)
    const [volume, setVolume] = React.useState(50)
    const [melody, setMelody] = React.useState('')

    const handlePower = () => {
        setPower(prevPower => !prevPower)
    }

    const handleVolume = (data) => {
      console.log(typeof data.target.value)
      setVolume(parseFloat(data.target.value))
  }

    const handleMode = () => {
        mode == 1 ? setMode(2) : setMode(1)
    }
    
    const handleMelody = (data) => {
        power ? setMelody(data.id) : ''
    }


    React.useEffect(function () {
        power ? '' : setMelody('')
        console.log(power, mode, melody)

    }, [power, mode, melody, volume])

    return <div className="main-container" id="drum-machine">
        <h1 id="title">DRUM MACHINE</h1>
        <Control 
            changePower={handlePower}
            changeMode={handleMode}   
            changeVolume={handleVolume}
            melodyDisplay={melody} 
            mode={mode}
            power={power}
            
        />
        
        <DrumPad 
            selectMelody={handleMelody}
            mode={mode}
            power={power}
            volume={volume}
        />
        

    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)