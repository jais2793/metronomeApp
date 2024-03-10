import { useRef, useState } from 'react'
import Timer from './plugins/timer.js'
import click2 from '/sounds/click2.wav'
import click3 from '/sounds/click3.wav'

function App() {
  const [bpm, setBpm] = useState(60)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
  const [bpmRunning, setBpmRunning] = useState(false)
  const clickRef2 = useRef(new Audio(click2))
  const clickRef3 = useRef(new Audio(click3))

  const [swingPercentage, setSwingPercentage] = useState(66)

  const handleBpmSlider = (e) => {
    setBpm(e.target.value)
  }

  const toggleBpm = () => {
    if(!bpmRunning){
      metronome.start()
    } else {
      metronome.stop()

    }
    setBpmRunning(!bpmRunning)
    
  }

  let count = 0;
  const playClick = () => {
    if(count === beatsPerMeasure){
      count = 0
    }
    if(count === 0){
      clickRef2.current.play()
      clickRef2.current.currentTime = 0    
    } else {
      clickRef3.current.play();
      clickRef3.current.currentTime = 0
    }
    count++
  }


  const metronome = new Timer(playClick, 60000 / bpm, swingPercentage,{ immediate: true });

  return (
    <>
      <div className='w-1/2 border border-gray-400 p-4 mx-auto mt-10 rounded'>
        <div>
          <h1>
            {bpm} BPM
          </h1>
          <div>
            <input
              type="range"
              value={bpm}
              min="30"
              max="500"
              onChange={(e) => handleBpmSlider(e)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
          </div>
        </div>
        <div>
          <button type="button" className="h-[50px] w-[50px] rounded-full bg-red-500 hover:bg-red-800 transition duration-300" onClick={toggleBpm}>{bpmRunning ? 'Stop' : 'Start'}</button>
        </div>
      </div>
    </>
  )
}

export default App
