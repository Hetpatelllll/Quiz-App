import { useEffect, useMemo, useState } from 'react';
import './app.css';
import Trivia from './components/Trivia';
import Timer from './components/Timer';
import Start from './components/Start';

function App() {

  const [qustionno, setQustionno] = useState(1)
  const [stop, setStop] = useState(false)
  const [earned, setEarned] = useState("$ 0")
  const [username, setUsername] = useState(null)

  const data = [
    {
      id: 1,
      qustion: "Who is the CEO of Google? ",
      answers: [
        {
          text: "Sundar Pichai",
          correct: true,
        },
        {
          text: "Tim Cook",
          correct: false,
        },
        {
          text: "Mark Zuckerberg",
          correct: false,
        },
        {
          text: " Jeff Bezos",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      qustion: "Who wrote the play Romeo and Juliet? ",
      answers: [
        {
          text: "William Shakespeare",
          correct: true,
        },
        {
          text: "Jane Austen",
          correct: false,
        },
        {
          text: " Charles Dickens",
          correct: false,
        },
        {
          text: "F. Scott Fitzgerald",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      qustion: "What is the largest ocean on Earth? ",
      answers: [
        {
          text: "Indian Ocean",
          correct: false,
        },
        {
          text: "Atlantic Ocean",
          correct: false,
        },
        {
          text: "Southern Ocean",
          correct: false,
        },
        {
          text: "Pacific Ocean",
          correct: true,
        },
      ],
    },
    {
      id: 4,
      qustion: "What is the currency of Japan? ",
      answers: [
        {
          text: "Won",
          correct: false,
        },
        {
          text: "Yen",
          correct: true,
        },
        {
          text: "Baht",
          correct: false,
        },
        {
          text: "Yuan",
          correct: false,
        },
      ],

    }
  ]

  const moneyPyramid = useMemo(() =>
    [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 400" },
      { id: 5, amount: "$ 500" },
      { id: 6, amount: "$ 600" },
      { id: 7, amount: "$ 700" },
      { id: 8, amount: "$ 800" },
      { id: 9, amount: "$ 900" },
      { id: 10, amount: "$ 1000" },
      { id: 11, amount: "$ 1100" },
      { id: 12, amount: "$ 1200" },
      { id: 13, amount: "$ 1300" },
      { id: 14, amount: "$ 1400" },
      { id: 15, amount: "$ 1500" },
    ].reverse(),
    [])

  useEffect(() => {
    qustionno > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === qustionno - 1).amount);
  }, [moneyPyramid, qustionno])

  return (
    <div className="app">

      {username ? (
        <>
          <div className="main">
            {
              stop ? <h1 className='endText'>you earned: {earned}</h1> : (
                <>
                  <div className="top">
                    <div className="timer"><Timer setStop={setStop} qustionno={qustionno} /></div>
                  </div>
                  <div className="bottom">
                    <Trivia data={data} setStop={setStop} qustionno={qustionno} setQustionno={setQustionno} />
                  </div>
                </>
              )}
          </div>
          <div className="pyramid">
            <div className="moneyList">

              {
                moneyPyramid.map((element) => (
                  <li className={qustionno == element.id ? "moneyListItems active" : "moneyListItems"}>
                    <span className='moneyListItemNumber'> {element.id} </span>
                    <span className='moneyListItemAmount'> {element.amount} </span>
                  </li>
                ))
              }

            </div>
          </div>
        </>
      ) : <Start setUsername={setUsername} />}

    </div>

  );
}
export default App;
