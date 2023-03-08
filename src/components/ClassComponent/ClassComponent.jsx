import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Угадайте число от 1 до 10',
      userNumber: '',
      randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
      count: 0,
      newGame: false,
    };
  }

  restartGame = () => {
    this.setState((state) => ({
      randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
      result: 'Угадайте число от 1 до 10',
      newGame: !state.newGame,
      count: 0,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((state) => ({
      count: this.state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
          userNumber: '',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
        };
      }
      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        newGame: !state.newGame,
        userNumber: '',
      };
    });
  };

  handleChange = (e) => {
    this.setState((state) => ({
      userNumber: e.target.value
    }));
    console.log(this.state);
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          {!this.state.newGame &&
          <>
            <label className={style.label} htmlFor='user_number'>
              Угадай число
            </label>
            <input className={style.input} type='number' id='user_number'
              onChange={this.handleChange} value={this.state.userNumber}
            />
            <button className={style.btn}>Угадать</button>
          </>}
          {this.state.newGame &&
          <button onClick={this.restartGame} className={style.btn}>
            Сыграть ещё
          </button>}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
