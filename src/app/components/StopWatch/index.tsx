import React, { Component } from "react";

interface State {
  isRunning: boolean;
  elapsedTime: number;
  isTimerMode: boolean;
  initialMinutes: number;
  initialSeconds: number;
  userInputMinutes: string;
  userInputSeconds: string;
}

class Stopwatch extends Component<{}, State> {
  private intervalID: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      isRunning: false,
      elapsedTime: 0,
      isTimerMode: false,
      initialMinutes: 0,
      initialSeconds: 0,
      userInputMinutes: "",
      userInputSeconds: "",
    };
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  toggleMode = () => {
    this.setState((prevState) => ({
      isTimerMode: !prevState.isTimerMode,
      elapsedTime: 0,
      userInputMinutes: "",
      userInputSeconds: "",
    }));
  };

  handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInputMinutes = event.target.value;
    this.setState({ userInputMinutes });
  };

  handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInputSeconds = event.target.value;
    this.setState({ userInputSeconds });
  };

  startTimer = () => {
    if (!this.state.isRunning) {
      if (this.state.isTimerMode) {
        const minutes = parseInt(this.state.userInputMinutes, 10);
        const seconds = parseInt(this.state.userInputSeconds, 10);

        if (isNaN(minutes) || minutes < 0 || isNaN(seconds) || seconds < 0) {
          return;
        }

        const initialTime = minutes * 60 + seconds;

        if (initialTime === 0) {
          return;
        }

        this.setState(
          { isRunning: true, initialMinutes: minutes, initialSeconds: seconds },
          () => {
            this.intervalID = setInterval(() => {
              this.setState((prevState) => {
                const newTime = prevState.elapsedTime + 1;
                if (
                  newTime >=
                  prevState.initialMinutes * 60 + prevState.initialSeconds
                ) {
                  this.stopTimer();
                }
                return { elapsedTime: newTime };
              });
            }, 1000);
          }
        );
      } else {
        this.setState({ isRunning: true }, () => {
          this.intervalID = setInterval(() => {
            this.setState((prevState) => ({
              elapsedTime: prevState.elapsedTime + 1,
            }));
          }, 1000);
        });
      }
    }
  };

  stopTimer = () => {
    if (this.state.isRunning) {
      if (this.intervalID) clearInterval(this.intervalID);
      this.setState({ isRunning: false });
    }
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({
      elapsedTime: 0,
      userInputMinutes: "",
      userInputSeconds: "",
    });
  };

  formatTime = (seconds: number) => {
    const pad = (num: number) => (num < 10 ? "0" + num : num);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  render() {
    const {
      isRunning,
      elapsedTime,
      isTimerMode,
      userInputMinutes,
      userInputSeconds,
    } = this.state;

    return (
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          {isTimerMode ? "Timer" : "Stopwatch"}
        </h1>
        {isTimerMode && (
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="number"
                placeholder="Minutes"
                value={userInputMinutes}
                onChange={this.handleMinutesChange}
                className="border border-gray-400 p-2 rounded-l"
              />
              <input
                type="number"
                placeholder="Seconds"
                value={userInputSeconds}
                onChange={this.handleSecondsChange}
                className="border border-gray-400 p-2 rounded-r"
              />
            </div>
          </div>
        )}
        <div className="text-4xl font-bold mb-4">
          {this.formatTime(elapsedTime)}
        </div>
        <div className="space-x-4">
          <button
            className={`${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded`}
            onClick={isRunning ? this.stopTimer : this.startTimer}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={this.resetTimer}
          >
            Reset
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            onClick={this.toggleMode}
          >
            Toggle Mode
          </button>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
