

// Text that displays the quotes
function Text(props) {
    return (
        <h2 
            id="text" 
            style={{animation: props.animate ? 'fadeIn 3s' : 'fadeIn2 3s',
                    color: props.main_color}}
            >{props.actualQuote}
        </h2>
    )
}

// Author of each quote
function Author(props) {
    return (
        <h4 
            id="author"
            style={{animation: props.animate ? 'fadeIn 2s' : 'fadeIn2 2s',
            color: props.main_color}}
            >{props.actualAuthor}
        </h4>
    )
}

// Box / container where wvweything is displayed
function QuoteBox(props) {
    return (
        <div id="quote-box">
            <div className="tweet">
                <a 
                    id="tweet-quote" 
                    title="Tweet this quote!" 
                    target="_blank" href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22We%20must%20believe%20that%20we%20are%20gifted%20for%20something%2C%20and%20that%20this%20thing%2C%20at%20whatever%20cost%2C%20must%20be%20attained.%22%20Marie%20Curie"
                    style={{color: props.main_color}}>
                    Tweet this quote!
                </a>
            </div>

            <Text 
                actualQuote={props.currentQuote}
                animate={props.animate}
                main_color={props.main_color}
            />
            <Author 
                actualAuthor={props.currentAuthor}
                animate={props.animate}
                main_color={props.main_color}
            />

            <button 
                type='submit' 
                className="btn" 
                id="new-quote" 
                onClick={props.changeData}
                style={{color: props.main_color}}
                >New quote
            </button>
        </div>
    )
}


function App() {
    // List of quotes
    const quoteList = [
        ["You know, Hobbes, some days even my lucky rocketship underpants don't help." , "Bill Watterson"],
        ["And now that you don't have to be perfect, you can be good.", "John Steinbeck"],
        ["Outside the windows the day was bright: golden sunshine, blue sky, pleasant wind... I wanted to punch the happy day in the face, grab it by the hair, and beat it until it told me what the hell it was so happy about.", "Ilona Andrews"],
        ["But I am very poorly today & very stupid & I hate everybody & everything. One lives only to make blunders.", "Charles Darwin"],
        ["I've had the sort of day that would make St. Francis of Assisi kick babies.", "Douglas Adams"],
        ["Don't cry because it's over. Smile because it happened.", "Dr. Seuss"],
        ["Anyone who has never made a mistake has never tried anything new.", "Albert Einstein"],
        ["Monsters are real, ghosts are real, too. They live inside us, and sometimes they win.", "Stephen King"]
    ]

    // List of colors for the background
    const colors = [
        'darkgreen', '#ec540e0', '#0b8ee6', '#390850', '#cc0b35'
    ]

    // State variables
    const [actualQuote, setActualQuote] = React.useState(quoteList[0][0])
    const [actualAuthor, setActualAuthor] = React.useState(quoteList[0][1])
    const [actualId, setActualId] = React.useState(0)
    const [animation, setAnimation] = React.useState(true)
    const [color, setColor] = React.useState('darkgreen')

    // Function that handles all the changes in the app
    function handleChangeInfo() {

        let indice = actualId
        while (indice == actualId) {
            indice = Math.floor(Math.random() * quoteList.length)
        }

        setActualId(() => {
            return indice
        })

        setActualQuote(() => {
            return quoteList[indice][0]
        })

        setActualAuthor(() => {
            return quoteList[indice][1]
        })

        setAnimation(current => !current)

        setColor(() => {

            console.log(color)
            let indice = color
            while (indice == color) {
                indice = colors[Math.floor(Math.random() * colors.length)]
            }

            console.log(indice)
            return  indice;
        })
    }

    // Renders the QuoteBox and personal information
    return (
        <div style={{backgroundColor: color}} className="main-container">
            <QuoteBox 
            currentQuote={actualQuote} 
            currentAuthor={actualAuthor}
            changeData={handleChangeInfo} 
            animate={animation}
            main_color={color}
        />
        <p className="description">Created by César Gómez</p>
        <a className="github-link" target="_blank" href="https://github.com/cdecesar">Github page. Check it out!</a>
        </div>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)