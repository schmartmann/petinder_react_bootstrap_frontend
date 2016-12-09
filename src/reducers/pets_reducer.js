const INITIAL_STATE = {
    current_pet:
      {
        city: '',
        state: '',
        photo: '',
        id: '',
        link: '',
        name: '',
        description: '',
        animal: ''
      },
    pet_batch: []
}


const sortPhotos = function(arr){
  // console.log("sortPhotos: ", arr);
  let photos = [];
  for (let index of arr){
    if (index["@size"] === "x"){
      photos.push(index["$t"])
    }
  }
  return photos[0];
}


export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case 'LOAD_PET':
      console.log("LOAD_PET firing: ", action.payload)
      let current_pet = action.payload.current_pet;
      let pet_batch = action.payload.pet_batch;
      return {
        current_pet: {
          animal: current_pet.animal,
          city: current_pet.city,
          state: current_pet.state,
          description: current_pet.description,
          pet_id: current_pet.pet_id,
          name: current_pet.name,
          photo: current_pet.photo,
          link: current_pet.link
        },
        pet_batch: pet_batch
      };
    case 'NEXT_PET':
      console.log("NEXT_PET firing: ", action.payload)
      let new_current_pet = action.payload[0];
      let new_pet_batch = action.payload[1];
      let new_current_pet_photos = sortPhotos(new_current_pet.photo);
      return {
        current_pet: {
          animal: new_current_pet.animal,
          city: new_current_pet.city,
          state: new_current_pet.state,
          description: new_current_pet.description,
          pet_id: new_current_pet.pet_id,
          name: new_current_pet.name,
          photo: new_current_pet_photos,
          link: new_current_pet.link
        },
        pet_batch: new_pet_batch
      };
    default:
      console.log("no pet loaded");
      return state;
  }
}
