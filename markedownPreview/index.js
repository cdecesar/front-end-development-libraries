
function Preview (props) {

    const getMarkdownText = () => {
        const rawMarkup = marked.parse(props.data, { breaks: true, gfm: true });
        return { __html: rawMarkup };
    };

    if (props.sDisplay == true) {
        return <div className="pre">
        <div className="head-block">
            <h4 className="title">Preview</h4>
            <button 
                id="close-preview" 
                className="close" 
                onClick={(event) => {
                    event.preventDefault()
                    props.changeDisplay(2)}}
                > { props.sDisplayEditor ? 
                    'OPEN':
                    'X'} </button>
        </div>
        <div 
            id="preview"
            dangerouslySetInnerHTML={getMarkdownText()}
        >
           
        </div>
    </div>
    }

    return ''
}

function Editor (props) {

    let info = '# This is the final result \n## This is just random text\n### And should not be taken into acount for anything really. \n You can also make text **bold**... whoa! \n Or _italic_. \n Or... wait for it... **_both!_** \n And feel free to go crazy ~~crossing stuff out~~.\n '
    info += 'Links can also be used [links](https://www.freecodecamp.org), and \n\n > Block Quotes! \nCrazy, rigth? \n\n'
    info += 'There are some other features included in this library, such as the display of images:\n\n ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n\n'
    info += 'This is a list:\n* First item \n* Second item \n* Third item'
    info += '\n\nCode can be displayed like this: `<div></div>`\n\n Or like this:\n\n'
    info += '```Code \nsetDisplayPreview(prevData) {\n\treturn !prevData\n}\n\n```'

    if (props.sDisplay == true) {
        return <div className="edit">
        <div className="head-block">
            <h4 className="title">Editor</h4>
            <button 
                id="close-editor" 
                className="close" 
                onClick={(event) => {
                    event.preventDefault()
                    props.changeDisplay(1)}}
                > { props.sBigDisplay ? 
                    'X':
                    'OPEN'} </button>
        </div>
        <div className="div-body">
            <textarea 
                className={ props.sBigDisplay ? 
                            'text-editor text-editor-big':
                            'text-editor'}
                id='editor'  
                onChange={(event) => {props.changeData(event)}}>               
            {info}</textarea>
        </div>
    </div>
    }

    return ''
}

function App () {

    let info = '# This is the final result \n## This is just random text\n### And should not be taken into acount for anything really. \n You can also make text **bold**... whoa! \n Or _italic_. \n Or... wait for it... **_both!_** \n And feel free to go crazy ~~crossing stuff out~~.\n '
    info += 'Links can also be used [links](https://www.freecodecamp.org), and \n\n > Block Quotes! \nCrazy, rigth? \n\n'
    info += 'There are some other features included in this library, such as the display of images:\n\n ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n\n'
    info += 'This is a list:\n* First item \n* Second item \n* Third item'
    info += '\n\nCode can be displayed like this: `<div></div>`\n\n Or like this:\n\n'
    info += '```Code \nsetDisplayPreview(prevData) {\n\treturn !prevData\n}\n\n```'
    

    const [text, setText] = React.useState(info)
    const [displayEditor, setDisplayEditor] = React.useState(true)
    const [displayPreview, setDisplayPreview] = React.useState(true)
    const [displayBidEditor, setDisplayBigPreview] = React.useState(false)


    const handleChangeText = (event) => {
        setText(event.target.value)
    }

    const handleDisplayMode = (data) => {

        if(data == 1) {
            setDisplayPreview(prevData => !prevData)
            setDisplayBigPreview(prevData => !prevData)
        }
        else {
            setDisplayEditor(prevData => !prevData)
        }
    }


    React.useEffect(function () {
        console.log(text)
      }, [text])


    return <div className='main-div'>
        <Editor 
            changeData={handleChangeText} 
            sDisplay={displayEditor}
            sBigDisplay={displayBidEditor}
            changeDisplay={handleDisplayMode}
        />
        <Preview 
            data={text}
            sDisplay={displayPreview}
            sDisplayEditor={displayEditor}
            changeDisplay={handleDisplayMode}
        />
    </div>
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)