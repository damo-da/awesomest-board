const initialState = {
  size: 10,
  pencil: "DEFAULT",
  color: "#ff0000"
};

const pencil = (state = initialState, action) => {

  switch(action.type){
    default:{
      return {...state}
    }

  }
};

export default pencil;
