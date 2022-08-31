import { useEffect, useState } from 'react';
import './styles/App.scss';
import NewQuoteForm from './components/NewQuoteForm';
import callToApi from './services/Fetch';
import FilterForm from './components/FilterForm';

function App() {
    const [quoteData, setQuoteData] = useState([]);
    const [quoteInput, setQuoteInput] = useState('');
    const [characterInput, setCharacterInput] = useState('');
    const [filterQuote, setFilterQuote] = useState('');

    useEffect(() => {
        callToApi()
            .then((data) => {
                setQuoteData(data);
            })
    }, [])

    const createNewQuote = (quoteInput, characterInput) => {
        return ({
            quote: quoteInput,
            character: characterInput
        })
    };

    const handleQuoteInput = (ev) => {
        setQuoteInput(ev.target.value);
    }

    const handleCharacterInput = (ev) => {
        setCharacterInput(ev.target.value);
    }

    const handleFilterInput = (ev) => {
        setFilterQuote(ev.target.value);
    }

    const cleanInput = () => {
        setCharacterInput('');
        setQuoteInput('');
    }


    const handleAddQuoteButon = (ev) => {
        ev.preventDefault();

        console.log(quoteInput + ',' + characterInput);

        if (quoteInput !== "" && characterInput !== "") {
            const newQuote = createNewQuote(quoteInput, characterInput);
            setQuoteData([...quoteData, newQuote])
            cleanInput()
        }

    }


    //hacer un doble filtrado para el filtro del select con una comparacion ===

    const filterByQuote = (quoteList) => {
        return (
            quoteList.filter((item) => item.quote.toLowerCase().includes(filterQuote.toLowerCase())))
    }

    /*  const filterByCharacter = (quoteList) => {
         return (
             quoteList.filter((item) => item.character.toLowerCase() === filterCharacter.toLowerCase())
         )
     } */
    const filteredByText = filterByQuote(quoteData)

    const renderQuoteData = filteredByText.map((item, index) => {

        return (<li className='quote-item' key={index}>
            <p className='quote-item-text'>"{item.quote}"</p>
            <span className='quote-item-character'>- {item.character}</span>
        </li>
        );
    });

    return (
        <div className="App">
            <header>
                <h1 className='header-title'>Frases de Friends</h1>
            </header>
            <FilterForm
                handleFilterInput={handleFilterInput}
                filterQuote={filterQuote}
            />
            <section>
                <ul className='quote-list'>
                    {renderQuoteData}
                </ul>
            </section>
            <NewQuoteForm
                handleAddQuoteButon={handleAddQuoteButon}
                handleCharacterInput={handleCharacterInput}
                handleQuoteInput={handleQuoteInput}
                quoteValue={quoteInput}
                characterValue={characterInput}
            />
        </div>
    );
}

export default App;
