import * as PlayerActionTypes from '../actiontypes/player';

const initialState = {
	players: [
	],
	selectedPlayerIndex: -1
}

export default function Player(state=initialState, action) {
  
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  switch(action.type) {
    case PlayerActionTypes.ADD_PLAYER:{
      const addPlayerList = [...state.players, {
          name: action.name,
          score: 0,
          created: `${hour}:${minute}:${seconds} on ${month}/${day}/${year}`
      }];
      return {
        ...state,
        players: addPlayerList
      };
    }
      
    case PlayerActionTypes.REMOVE_PLAYER: {
      const  removePlayerList =[
        ...state.players.slice(0, action.index),
        ...state.players.slice(action.index + 1)
      ];
      return {
        ...state,
        players: removePlayerList
      };
    }
      
    case PlayerActionTypes.UPDATE_PLAYER_SCORE: {
      const updatePlayerList = state.players.map((player, index) => {
        if(index === action.index) {
          return {
            ...player,
            score: player.score + action.score,
            updated: `${hour}:${minute}:${seconds} on ${month}/${day}/${year}`
          };
        }
        return player;
      });
      return {
        ...state,
        players: updatePlayerList
      };
    }
    
    case PlayerActionTypes.SELECT_PLAYER: 
      return {
        ...state,
        selectedPlayerIndex: action.index
      };
      
    default:
      return state;
  }
}
