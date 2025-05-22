export const initialStore=()=>{
  return{
  favoritos:[],
  person:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_favorite':
      return {
        ...store, 
        favoritos: [...store.favoritos, action.payload]
      }
    case 'add_people':
      return{
        ...store,
        person: action.payload
      }
    case 'remove_favorite':
      return{
        ...store,
        favoritos: store.favoritos.filter(fav => 
          !(fav.data.name === action.payload.name && fav.data.uid === action.payload.uid)
        )
      }

    default:
      throw Error('Unknown action.');
  }    
}
