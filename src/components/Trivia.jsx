import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import play from '../assets/src_sounds_play.mp3'                  
import correct from '../assets/src_sounds_correct.mp3'                  
import wrong from '../assets/src_sounds_wrong.mp3'   
import background from '../assets/src_sounds_wait.mp3'   

const Trivia = ({ data, setStop, setQustionno, qustionno}) => {

  const [qustion, setQustion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)
  const [backgroundMusic] = useSound(background)

  useEffect(()=>{
    backgroundMusic();
    letsPlay();
  },[letsPlay,backgroundMusic])

  useEffect(() => {
    setQustion(data[qustionno - 1])
  }, [data, qustionno])

  // delay function
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration)
  }

  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");

    // delay(3000,()=>({ setClassName(a.correct ? "answer correct" : "answer wrong")})
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });

    delay(6000, () => {
      if (a.correct) {
        correctAnswer();
        setQustionno((prev) => prev + 1);
        setSelectAnswer(null)
      }
      else {
        wrongAnswer();
        setStop(true);
      }
    });

    // delay(5000, () => {
    //   if (a.correct) {
    //     correctAnswer();
    //     delay(1000, () => {
    //       setQuestionNumber((prev) => prev + 1);
    //       setSelectAnswer(null);
    //     });

    // same as above function                                             
    // setTimeout(() => {                                             
    //   setClassName(a.correct ? "answer correct" : "answer wrong");                                             
    // },100)                                             
  }

  return (
    <div className='trivia'>
      <div className="qustion">{qustion?.qustion}</div>
      <div className="answers">
        {
          qustion?.answers.map((a) => (
            <div className={selectAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>{a.text}</div>
          ))
        }
      </div>
    </div>
  )
}

export default Trivia