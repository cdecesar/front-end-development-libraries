function App () {

    const buttons = [1,2,3,4,5,6,7,8,9,0,'+','-','x','/','=','.','AC']
    const ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'add', 'subtract', 'multiply', 'divide', 'equals', 'decimal', 'clear']
    
    const [value, setValue] = React.useState(0)
    const [input, setInput] = React.useState('')
    const [dotAvailable, setDotAvailable] = React.useState(true)
    const [prevResult, setPrevResult] = React.useState('')
    const [zeroClause, setZeroClause] = React.useState(false)



    const calculate_values = () => {

        if (input.indexOf('INFINITY') != -1) {
            return 'INFINITY'
        }

        if (input.indexOf('NAN') != -1) {
            return 'NAN'
        }

        if (input.substr(-1) == '-' || input.substr(-1) == '+' || input.substr(-1) == 'x' || input.substr(-1) == '/' || input.substr(-1) == '.') {
            return 'NAN'
        }

        let numbers = []
        let aux1 = ''
        let aux2 = ''
        let aux3 = ''
        let sign = ''

        for (let i = 0; i < input.length; i++) {

            if (parseInt(input.charAt(i)) || (input.charAt(i) == '.') || input.charAt(i) == '0') {
                aux1 += input.charAt(i)
            } else {
                if (sign != '' && aux1.indexOf('.') != -1 && aux1 != '') {
                    numbers.push(0 - parseFloat(aux1))
                    aux1 = ''
                    sign = ''
                } else if (sign != '' && aux1.indexOf('.') == -1 && aux1 != '') {
                    numbers.push(0 - parseInt(aux1))
                    aux1 = ''
                    sign = ''
                } else if (aux1.indexOf('.') != -1 && aux1 != '') {
                    numbers.push(parseFloat(aux1))
                    aux1 = ''
                } else if (aux1.indexOf('.') == -1 && aux1 != '') {
                    numbers.push(parseInt(aux1))
                    aux1 = ''
                }

                if (input.charAt(i) == '-') {
                    sign = '-'
                } else {
                    numbers.push(input.charAt(i))
                }
            }
        }

        if (aux1 != ''){
            if (sign != '' && aux1.indexOf('.') != -1) {
                numbers.push(0 - parseFloat(aux1))
                aux1 = ''
            } else if (sign != '' && aux1.indexOf('.')) {
                numbers.push(0 - parseInt(aux1))
                aux1 = ''
            } else if (aux1.indexOf('.') != -1) {
                numbers.push(parseFloat(aux1))
                aux1 = ''
            } else if (aux1.indexOf('.') == -1) {
                numbers.push(parseInt(aux1))
                aux1 = ''
            }
        }

        let pointer = 1
        aux1 = numbers[0]
        while (pointer != numbers.length) {
            aux2 = numbers[pointer]
            if (typeof aux1 == "number" && typeof aux2 == "number") {
                aux1 = aux1 + aux2
            } else {
                pointer += 1
                aux3 = numbers[pointer]

                if (aux2 == '+') {
                    aux1 = aux1 + aux3
                } else if (aux2 == '-') {
                    aux1 = aux1 - aux3
                } else if (aux2 == 'x') {
                    aux1 = aux1 * aux3
                } else if (aux2 == '/'){
                    if (aux3 == 0) {
                        return 'INFINITY'
                    }
                    aux1 = aux1 / aux3
                }
            }
            pointer += 1
        }

        return aux1  
    }

    const handleAction = (data) => {
        
        if (data === '=') {
            const result = calculate_values()
            setInput(prevInput => prevInput + '=' + result.toString())
            setValue(result)
            setPrevResult(result)
            setDotAvailable(true)

        } else if (data === 'AC') {
            setValue(0)
            setInput('')
            setDotAvailable(true)
            setPrevResult('')
        
        } else if (typeof data == 'string') {
            if (data == '-') {
                if (input.substr(-2) == '--' || input.substr(-1) == '.' || input.substr(-2) == 'x-' || input.substr(-2) == '+-' || input.substr(-2) == '/-') {
                } else {
                    if (prevResult != '') {
                        setInput(value + data)
                        setValue('-')
                        setPrevResult('')
                        
                    } else {
                        setValue('-')
                        setInput(prevInput => prevInput + data)
                        setDotAvailable(true)
                    }

                } 
            } else if (data == '.') {

                if (dotAvailable) {
                    
                    if (prevResult != '') {
                        setDotAvailable(false)
                        setValue('0.')
                        setInput('0.')
                        setPrevResult('')
                    } else if (parseInt(input.substr(-1)) || input.substr(-1) == '0') {
                        setDotAvailable(false)
                        setValue(prevValue => prevValue + '.')
                        setInput(prevInput => prevInput + data)
                    } else if (input.substr(-1) != '.' && typeof input.substr(-1) === 'string') {
                        setDotAvailable(false)
                        setValue('0.')
                        setInput(prevInput => prevInput + '0' + data)
                    } 
                } else {
                    if (input.substr(-1) == '.') {
                        setValue(prevValue => prevValue + '0')
                        setInput(prevInput => prevInput + '0')
                    }
                }
            } else {

                if (parseInt(input.substr(-1))) {
                    if (prevResult != '') {
                        setInput(value + data)
                        setValue(data)
                        setPrevResult('')
                        setDotAvailable(true)
                        
                    } else {
                        setDotAvailable(true)
                        setValue(data)
                        setInput(prevInput => prevInput + data)
                    }
                    
                } else if (input.substr(-1) != '.') {
                    if (input.substr(-1) == '-') {
                        if (input.substr(-2) == 'x-' || input.substr(-2) == '+-' || input.substr(-2) == '/-' || input.substr(-2) == '--') {
                            setDotAvailable(true)
                            setValue(data)
                            setInput(prevInput => prevInput.slice(0, -2) + data)
                        } else {
                            setDotAvailable(true)
                            setValue(data)
                            setInput(prevInput => prevInput.slice(0, -1) + data)
                        }
                    } else if (input.substr(-1) == '+' || input.substr(-1) == 'x' || input.substr(-1) == '/'){
                        setDotAvailable(true)
                        setValue(data)
                        setInput(prevInput => prevInput.slice(0, -1) + data)
                    } else {
                        if (prevResult != '') {
                            setInput(value + data)
                            setValue(data)
                            setPrevResult('')
                            setDotAvailable(true)
                            
                        } else {
                            setDotAvailable(true)
                            setValue(data)
                            setInput(prevInput => prevInput + data)
                        }
                        
                    }
                } 
            }
        } else {

            if (prevResult != '') {
                setInput('')
                setValue('')
                setPrevResult('')
            }

            if (typeof value == 'number') {
                setValue(data.toString())
                setInput(prevInput => prevInput + data.toString())
                if (data == 0) {
                    setZeroClause(true)
                }
            } else if (input.substr(-1) == '-' || input.substr(-1) == 'x' || input.substr(-1) == '/' || input.substr(-1) == '+') {
                setValue(data.toString())
                setInput(prevInput => prevInput + data.toString())
                if (data == 0) {
                    setZeroClause(true)
                }

            } else {

                if (zeroClause) {
                    if (data  != 0) {
                        setValue(prevValue => prevValue + data.toString())
                        setInput(prevInput => prevInput + data.toString())
                        setZeroClause(false)
                    } 
                } else {
                    setValue(prevValue => prevValue + data.toString())
                    setInput(prevInput => prevInput + data.toString())
                }
            }
        }
        
    }

    React.useEffect(function () {
    }, [value, input, dotAvailable])

    return  <div className="backGround">
                <h1 id="title">Calculator</h1>
                <div className="calculator">
                    <div id="display-div">
                        <p id="display-value">{input}</p>
                        <div id="display">{value}</div>
                    </div>
                    <div className="buttons">
                        {buttons.map(list_value => 
                            <button key={ids[buttons.indexOf(list_value)]} className="input-button" id={ids[buttons.indexOf(list_value)]} onClick={() => {
                                handleAction(list_value)}}>{list_value}</button>
                        )}
                    </div>
                </div>
            </div>
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)