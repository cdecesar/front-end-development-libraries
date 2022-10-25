function Controler (props) {
    console.log(`${props.type} + -label`)
    return (
        <div className='control-buttons'>
            <h3 id={`${props.type}-label`}>{props.title}</h3>
            
            <button id={`${props.type}-decrement`} className="btn lighten-2" onClick={() => props.handleTime(-60, props.type)}>
                <i className="material-icons">arrow_downwards</i>
            </button>
            <h3 id={`${props.type}-length`}>{props.displayTime(props.time)}</h3>
            <button id={`${props.type}-increment`} className="btn" onClick={() => props.handleTime(60, props.type)}>
                <i className="material-icons">arrow_upwards</i>
            </button>
            
        </div>
    )
}

function App () {
    const [time, setTime] = React.useState(25 * 60)
    const [breakTime, setBreakTime] = React.useState(5 * 60)
    const [sessionTime, setSessionTime] = React.useState(25 * 60)
    const [paused, setPaused] = React.useState(false)
    const [working, setWorking] = React.useState(false)
    const [transitionAudio, seTransitionAudio] = React.useState(
        new Audio("https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3")
    )

    const playSound = () => {
        transitionAudio.currentTime = 0
        transitionAudio.play()
    }

    const updateTimes = (amount, type) => {
        if (type == 'break') {
            if (amount < 0) {
                setBreakTime(prev => Math.max(60,  prev + amount))
            } else {
                setBreakTime(prev => Math.min(3600,  prev + amount))
            }
        } else {
            if (amount < 0) {
                setSessionTime(prev => Math.max(60,  prev + amount))
            } else {
                setSessionTime(prev => Math.min(3600,  prev + amount))
            }

            if (!working) {
                if (amount < 0) {
                    setTime(prev => Math.max(60,  prev + amount))
                } else {
                    setTime(prev => Math.min(3600,  prev + amount))
                }
            }
        }
    }

    const controlTimer = () => {
        let sec = 1000
        let date = Date.now()
        let nextIteration = Date.now() + sec
        let onPaused = paused
        console.log('aaa')
        if (!working) {
            let interval = setInterval(() => {
                date = Date.now()
                    if (date > nextIteration) {
                        setTime((prev) => {
                            if (prev == 0 && !onPaused) {
                                document.getElementById("beep").play();
                                onPaused = true
                                setPaused(true)
                                return breakTime
                            } else if (prev == 0 && onPaused) {
                                document.getElementById("beep").play();
                                onPaused = false
                                setPaused(false)
                                return sessionTime
                            }

                            

                            return prev - 1
                        })
                        nextIteration += sec
                    }
                    
            }, 30)
            localStorage.clear()
            localStorage.setItem('intervalCode', interval)
        }

        if (working) {
            clearInterval(localStorage.getItem('intervalCode'))
        }

        setWorking(!working)
    }

    const reset = () => {
        setTime(25 * 60)
        setBreakTime(5 * 60)
        setSessionTime(25 * 60)
        clearInterval(localStorage.getItem('intervalCode'))
        localStorage.clear()
        setWorking(false)
        setPaused(false)
        document.getElementById("beep").pause()
    }

    const displayLengths = (length) => {
        return Math.floor(length / 60)
    }

    const displayTime = (totalSeconds) => {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        if (minutes >= 10 && seconds < 10) {
            return minutes + ':' + '0' + seconds
        } else if (minutes < 10 && seconds < 10) {
            return '0' + minutes + ':' + '0' + seconds
        } else if (minutes < 10 && seconds >= 10) {
            return '0' + minutes + ':' + seconds
        }
        return  minutes + ':' + seconds
    }
        
    return <div id="items">
        <h1>25 + 5 Clock</h1>
        <div id="controls">
            <Controler
                title={'Break Length'}
                handleTime={updateTimes}
                type={'break'}
                time={breakTime}
                displayTime={displayLengths}
                className='control-break'
            />
            <Controler
                title={'Session Length'}
                handleTime={updateTimes}
                type={'session'}
                time={sessionTime}
                displayTime={displayLengths}
                className='control-session'
            />
        </div>
        
        <div id="display-time"> 

            <h3 id="timer-label">{paused ? 'Break' : 'Session'}</h3>
            <audio id="beep" src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" type="audio/mp3"></audio>
            <h1 id="time-left">{displayTime(time)}</h1>

        </div>
        <div id="control-timer">
                
            <button id="start_stop" className="btn controlTimerBtn" onClick={controlTimer}>
                {!working ? (
                    <i className="material-icons">play_circle_filled</i>
                ) : (
                    <i className="material-icons">pause_circle_filled</i>
                )}
            </button>
            <button id="reset" className="btn controlTimerBtn" onClick={reset}>
                {
                    <i className="material-icons">autorenew</i>
                }
            </button>

        </div>
    </div>
}

<i className="material-icons">pause_circle_filled</i>

ReactDOM.render(
    <App />,
    document.getElementById("root")
)