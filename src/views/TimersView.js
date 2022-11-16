import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppProvider";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Timer = styled.div`
  border: 2px solid #2e2e2e;
  border-radius: 5px;
  margin: 8px;
  background: #ffffff;
`;

const TimerTitle = styled.div`
  font-size: 15px;
  font-style: italic;
  text-align: left;
  background-color: #2e2e2e;
  padding: 7px;
  color: #ffffff;
`;

const TimersView = () => {
  const { timers, currentTime, activeIndex } = useContext(AppContext);

  const InnerTimer = ({type, props}) => {
    if (type === 'Stopwatch') {
      return <Stopwatch props={props} />
    } else if (type === 'Countdown') {
      return <Countdown props={props} />
    } else if (type === 'XY') {
      return <XY props={props} />
    } else if (type === 'Tabata') {
      return <Tabata props={props} />
    };
  };

  return (
    <Timers>
      {timers && timers.map((timer, index) => (
        <Timer key={timer.id}>
          <TimerTitle>{timer.timerType}</TimerTitle>
          <div style={{ width: "430px", padding: "15px 0 15px 25px",}}>
            <InnerTimer type={timer.timerType} props={{
              index: index,
              workoutRoundDuration: timer.workoutRoundDuration,
              restRoundDuration: timer.restRoundDuration,
              totalWorkoutDuration: timer.totalWorkoutDuration,
              totalRestDuration: timer.totalRestDuration,
              totalDuration: timer.totalWorkoutDuration,
              rounds: timer.inputRounds,
              progress: currentTime,
              status: index === activeIndex ? 'Current' : index > activeIndex ? 'Upcoming' : 'Complete',
            }} />
          </div>
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;